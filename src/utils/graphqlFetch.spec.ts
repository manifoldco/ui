import { EventEmitter } from '@stencil/core';
import fetchMock from 'fetch-mock';

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
      await fetcher({ query: '' });
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

      const result = await fetcher({ query: '' });

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
      }).catch(result => {
        expect(fetchMock.called(graphqlEndpoint)).toBe(true);
        expect(result).toEqual(err);
      });
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

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith(errors);
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

      await fetcher({ query: '' });
      // graphql format
      expect(errorReporter).toHaveBeenCalledWith(body.errors);
    });

    it('reports unknown errors', async () => {
      const fetcher = createGraphqlFetch({
        wait: () => 0,
        endpoint: () => graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 500, body: {} });

      await fetcher({ query: '' });
      // graphql format
      expect(errorReporter).toHaveBeenCalledWith([{ message: 'Internal Server Error' }]);
    });

    it('reports auth errors', async () => {
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

      const response = { status: 401, body };
      fetchMock.mock(graphqlEndpoint, response);

      return fetcher({ query: '' }).catch(() => {
        expect(errorReporter).toHaveBeenCalledWith(body);
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

        fetchMock.mock(graphqlEndpoint, { status: 401, body: {} });

        expect.assertions(2);
        return fetcher({ query: '' }).catch(result => {
          expect(fetchMock.called(graphqlEndpoint)).toBe(true);
          expect(result).toEqual(new Error('Auth token expired'));
        });
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

        fetchMock.mock(graphqlEndpoint, { status: 401, body: {} });

        expect.assertions(1);
        return fetcher({ query: '' }).catch(() => {
          expect(setAuthToken).toHaveBeenCalledWith('');
        });
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
          .once(graphqlEndpoint, { status: 401, body: {} })
          .mock(graphqlEndpoint, { status: 200, body }, { overwriteRoutes: false });

        const fetch = fetcher({ query: '' });

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

      const result = await fetcher({ query: '' });

      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('401: unauthorized (token expired)', async () => {
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

      fetchMock.mock(graphqlEndpoint, { status: 401, body });

      expect.assertions(2);
      return fetcher({
        query: '',
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

      const result = await fetcher({ query: '' });
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

      const result = await fetcher({ query: '' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual({
        data: null,
        errors: [{ message: 'Internal Server Error' }],
      });
    });
  });

  describe('metrics', () => {
    it('emits a metrics event from document when no EventEmitter supplied', async () => {
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

      let event: CustomEvent | undefined;
      window.addEventListener('manifold-graphql-fetch-duration', e => {
        event = e as CustomEvent;
      });

      await fetcher({ query: '' });
      expect(event && event.detail && event.detail.duration).toBeDefined();
    });

    it('emits a metrics event from an EventEmitter when supplied', async () => {
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

      const emitter: EventEmitter = {
        emit: jest.fn(),
      };

      await fetcher({ query: '', emitter });
      expect((emitter.emit as jest.Mock).mock.calls[0][0]).toMatchObject({
        type: 'manifold-graphql-fetch-duration',
      });
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
      await fetcher({ query: '' });
      const body = fetchMock.calls()[0][1] as RequestInit;
      expect(body.headers).toEqual(expect.objectContaining({ Connection: 'keep-alive' }));
    });
  });
});
