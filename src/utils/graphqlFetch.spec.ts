import fetchMock from 'fetch-mock';

/* eslint-disable @typescript-eslint/no-explicit-any */

const errorReporter = jest.fn();
jest.mock('./errorReport', () => ({ report: errorReporter }));

// eslint-disable-next-line import/first
import { createGraphqlFetch } from './graphqlFetch';

describe('graphqlFetch', () => {
  const graphqlEndpoint = 'http://test.test/graphql';

  afterEach(() => {
    errorReporter.mockReset();
    fetchMock.restore();
  });

  describe('general', () => {
    it('defaults to api.manifold.co/graphql', async () => {
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        /* no endpoint */
      });
      fetchMock.mock('https://api.manifold.co/graphql', {
        status: 200,
        body: { data: {} },
      });
      await fetcher({ query: '', element: document.createElement('custom-element') });
      expect(fetchMock.called('https://api.manifold.co/graphql')).toBe(true);
    });

    it('returns data from server', async () => {
      const body = {
        data: {
          test: 1,
        },
      };
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 200,
        body,
      });

      const result = await fetcher({
        query: '',
        element: document.createElement('custom-element'),
      });

      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('throws if the fetch errored', () => {
      const err = new Error('ohnoes');
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { throws: err });

      expect.assertions(2);
      return fetcher({
        query: 'myQuery',
        element: document.createElement('custom-element'),
      }).catch(result => {
        expect(fetchMock.called(graphqlEndpoint)).toBe(true);
        expect(result).toEqual(err);
      });
    });

    it('emits component name and npm version', async () => {
      const tagName = 'my-custom-tag';
      const element = document.createElement(tagName);

      fetchMock.mock(graphqlEndpoint, { data: {} });
      const fetcher = createGraphqlFetch({ endpoint: () => graphqlEndpoint });
      await fetcher({ query: '', element });

      const [, req] = fetchMock.calls()[0];
      const headers = (req && req.headers) as any;
      expect(headers['x-manifold-component']).toBe(tagName.toUpperCase()); // expect our component name to be there
    });
  });

  describe('error reporting', () => {
    it('reports db errors', async () => {
      const errors = [{ message: 'bad query', locations: [] }];
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 200, // error code for malformed query
        body: { data: null, errors },
      });

      await fetcher({ query: '', element: document.createElement('custom-element') });
      expect(errorReporter).toHaveBeenCalledWith(errors, {});
    });

    it('reports GraphQL errors', async () => {
      const body = {
        data: null,
        errors: [
          { message: 'User does not have permission to access the resource', path: ['resources'] },
        ],
      };
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 422, body });

      await fetcher({ query: '', element: document.createElement('custom-element') });
      // graphql format
      expect(errorReporter).toHaveBeenCalledWith(body.errors, {});
    });

    it('reports unknown errors', async () => {
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 500, body: {} });

      await fetcher({ query: '', element: document.createElement('custom-element') });
      // graphql format
      expect(errorReporter).toHaveBeenCalledWith([{ message: 'Internal Server Error' }], {});
    });

    it('reports auth errors', async () => {
      const body = {
        data: null,
        errors: [
          {
            message: 'User does not have permission to access the resource',
            path: ['resources'],
            extensions: { type: 'AuthFailed' },
          },
        ],
      };

      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      const response = { status: 200, body };
      fetchMock.mock(graphqlEndpoint, response);

      return fetcher({ query: '', element: document.createElement('custom-element') }).catch(() => {
        expect(errorReporter).toHaveBeenCalledWith(body.errors, {});
      });
    });
  });

  describe('Expired auth tokens', () => {
    describe('With no retries', () => {
      it('throws when expired', () => {
        const fetcher = createGraphqlFetch({
          wait: () => 0,
          endpoint: () => graphqlEndpoint,
          getAuthToken: () => undefined,
        });

        fetchMock.mock(graphqlEndpoint, {
          status: 200,
          body: { errors: [{ extensions: { type: 'AuthFailed' } }] },
        });

        expect.assertions(2);
        return fetcher({ query: '', element: document.createElement('custom-element') }).catch(
          result => {
            expect(fetchMock.called(graphqlEndpoint)).toBe(true);
            expect(result).toEqual(new Error('Auth token expired'));
          }
        );
      });
    });

    describe('with retries', () => {
      it('resets token on error', async () => {
        const setAuthToken = jest.fn();
        const fetcher = createGraphqlFetch({
          wait: () => 0,
          endpoint: () => graphqlEndpoint,
          getAuthToken: () => '1234',
          setAuthToken,
        });

        fetchMock.mock(graphqlEndpoint, {
          status: 200,
          body: { errors: [{ extensions: { type: 'AuthFailed' } }] },
        });

        expect.assertions(1);
        return fetcher({ query: '', element: document.createElement('custom-element') }).catch(
          () => {
            expect(setAuthToken).toHaveBeenCalledWith('');
          }
        );
      });

      it('Will retry if the token is refreshed', async () => {
        const setAuthToken = jest.fn();
        const fetcher = createGraphqlFetch({
          wait: () => 0,
          endpoint: () => graphqlEndpoint,
          getAuthToken: () => undefined,
          setAuthToken,
          retries: 1,
        });

        const body = { data: { title: 'test' }, errors: null };

        fetchMock
          .once(graphqlEndpoint, {
            status: 200,
            body: { errors: [{ extensions: { type: 'AuthFailed' } }] },
          })
          .mock(graphqlEndpoint, { status: 200, body }, { overwriteRoutes: false });

        const fetch = fetcher({ query: '', element: document.createElement('custom-element') });

        /* Queue the dispatch back a tick to allow listeners to be set up */
        await new Promise(resolve => {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent('manifold-token-receive', { detail: { token: '12344' } })
            );

            resolve();
          });
        });

        const result = await fetch;

        expect(fetchMock.calls).toHaveLength(2);
        expect(result).toEqual(body);
      });
    });
  });

  // Note: we’re testing status codes ahead-of-time, to ensure handling of them doesn’t change
  describe('responses by status codes', () => {
    it('200: OK', async () => {
      const body = {
        data: null,
        errors: [{ message: 'no results', locations: [] }],
      };
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 200, // error code for DB error (e.g. nothing returned)
        body,
      });

      const result = await fetcher({
        query: '',
        element: document.createElement('custom-element'),
      });

      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('Unauthorized (token expired)', async () => {
      const body = {
        data: null,
        errors: [
          {
            message: 'User does not have permission to access the resource',
            path: ['resources'],
            extensions: { type: 'AuthFailed' },
          },
        ],
      };

      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 200, body });

      expect.assertions(2);
      return fetcher({
        query: '',
        element: document.createElement('custom-element'),
      }).catch(e => {
        expect(fetchMock.called(graphqlEndpoint)).toBe(true);
        expect(e.message).toEqual('Auth token expired');
      });
    });

    it('422: should return (bad gql query)', async () => {
      const body = {
        data: null,
        errors: [{ message: 'illegal base32 data at input byte 4', path: ['product'] }],
      };
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 422, body });

      const result = await fetcher({
        query: '',
        element: document.createElement('custom-element'),
      });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('500: returns generic message if none given', async () => {
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 500, // error code for something that went wrong
        body: {},
      });

      const result = await fetcher({
        query: '',
        element: document.createElement('custom-element'),
      });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual({
        data: null,
        errors: [{ message: 'Internal Server Error' }],
      });
    });
  });

  describe('metrics', () => {
    it('emits a metrics event ', async () => {
      const element = document.createElement('my-element');
      const mockEvent = jest.fn();
      element.addEventListener('manifold-graphql-fetch-duration', mockEvent);

      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        data: null,
        errors: [{ message: 'no results', locations: [] }],
      });
      await fetcher({ query: '', element });

      // test duration
      expect(mockEvent.mock.calls[0][0].detail.duration).toBeGreaterThanOrEqual(0);
      // test everything BUT duration
      expect(mockEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            componentName: 'MY-ELEMENT',
            errors: [{ locations: [], message: 'no results' }],
            npmVersion: '<@NPM_PACKAGE_VERSION@>', // expect Rollbar-replaceable string
            request: { query: '' },
            type: 'manifold-graphql-fetch-duration',
          }),
        })
      );
    });
  });

  describe('performance', () => {
    it('keeps connection alive (speeds up Chrome)', async () => {
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });
      fetchMock.mock(graphqlEndpoint, {
        status: 200,
        body: { data: null, errors: null },
      });
      await fetcher({ query: '', element: document.createElement('custom-element') });
      const body = fetchMock.calls()[0][1] as RequestInit;
      expect(body.headers).toEqual(expect.objectContaining({ Connection: 'keep-alive' }));
    });
  });
});
