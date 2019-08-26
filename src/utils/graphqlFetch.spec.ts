import { EventEmitter } from '@stencil/core';
import fetchMock from 'fetch-mock';

const errorReporter = jest.fn();
jest.mock('./errorReport', () => ({ report: errorReporter }));

// eslint-disable-next-line import/first
import { createGraphqlFetch } from './graphqlFetch';

describe('graphqlFetch', () => {
  const oldSetTimeout = setTimeout;
  const graphqlEndpoint = 'http://test.test/graphql';

  beforeEach(() => {
    global.setTimeout = oldSetTimeout;
    errorReporter.mockReset();
    fetchMock.restore();
  });

  describe('general', () => {
    it('defaults to api.manifold.co/graphql', async () => {
      const fetcher = createGraphqlFetch({
        /* no endpoint */
      });
      fetchMock.mock('https://api.manifold.co/graphql', {
        status: 200,
        body: { data: {} },
      });
      await fetcher({ query: '', isPublic: true });
      expect(fetchMock.called('https://api.manifold.co/graphql')).toBe(true);
    });

    it('returns data from server', async () => {
      const body = {
        data: {
          test: 1,
        },
      };
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 422, body });

      await fetcher({ query: '' });
      // graphql format
      expect(errorReporter).toHaveBeenCalledWith(body.errors);
    });

    it('reports unknown errors', async () => {
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body });

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith(body.errors);
    });
  });

  describe('auth', () => {
    it('throws when expired', () => {
      // @ts-ignore
      global.setTimeout = jest.fn(call => call());
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        wait: 1,
        getAuthToken: () => undefined,
      });

      fetchMock.mock(graphqlEndpoint, 200);

      expect.assertions(2);
      return fetcher({ query: '' }).catch(result => {
        expect(fetchMock.called(graphqlEndpoint)).toBe(false);
        expect(result).toEqual(new Error('No auth token given'));
      });
    });

    it('resets token on error', async () => {
      const setAuthToken = jest.fn();
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
        setAuthToken,
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body: {} });

      await fetcher({ query: '' });
      expect(setAuthToken).toHaveBeenCalledWith('');
    });

    it('can retry on error', async () => {
      const setAuthToken = jest.fn();
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
        setAuthToken,
        retries: 1,
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body: {} });

      await fetcher({ query: '' });
      expect(fetchMock.calls.length).toBe(2);
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
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body });

      const result = await fetcher({ query: '' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('422: should return (bad gql query)', async () => {
      const body = {
        data: null,
        errors: [{ message: 'illegal base32 data at input byte 4', path: ['product'] }],
      };
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 422, body });

      const result = await fetcher({ query: '' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual(body);
    });

    it('500: returns generic message if none given', async () => {
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
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
        endpoint: graphqlEndpoint,
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
});
