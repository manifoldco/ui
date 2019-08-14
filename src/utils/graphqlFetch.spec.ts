import fetchMock from 'fetch-mock';

import { createGraphqlFetch } from './graphqlFetch';

const errorReporter = jest.fn();
jest.mock('./errorReport', () => ({
  report: errorReporter,
}));

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

    it('Will return the an error if the fetch triggered one', () => {
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
    it('reports GraphQL errors', async () => {
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

    it('reports server errors', async () => {
      const error = { message: 'bad request' };
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 422, body: error });

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith(error);
    });

    it('reports API errors', async () => {
      const errors = [{ message: 'bad request' }];
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 500, body: {} });

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith(errors);
    });

    it('reports server errors', async () => {
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 500, body: {} });

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith('Internal Server Error');
    });

    it('reports auth errors', async () => {
      const errors = [{ message: 'unauthorized' }];
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body: errors });

      await fetcher({ query: '' });
      expect(errorReporter).toHaveBeenCalledWith(errors);
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

    it('resets token on error', () => {
      const setAuthToken = jest.fn();
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
        setAuthToken,
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 401,
        body: {},
      });

      expect.assertions(3);

      return fetcher({ query: '' }).catch(result => {
        expect(fetchMock.called(graphqlEndpoint)).toBe(true);
        expect(setAuthToken).toHaveBeenCalledWith('');
        expect(result).toEqual(new Error('Auth token expired'));
      });
    });
  });

  describe('status codes', () => {
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
        type: 'unauthorized',
        message: ['unauthenticated for invalid credentials'],
      };
      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, { status: 401, body });

      const result = await fetcher({ query: '' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual({
        data: null,
        errors: [{ message: body.message[0] }],
      });
    });

    it('422: should return (bad gql query)', async () => {
      const body = {
        data: null,
        errors: [{ message: 'bad query', locations: [] }],
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

    it('500: returns error message if given', async () => {
      const body = {
        type: 'error',
        message: ['An unexpected error occurred'],
      };

      const fetcher = createGraphqlFetch({
        endpoint: graphqlEndpoint,
        getAuthToken: () => '1234',
      });

      fetchMock.mock(graphqlEndpoint, {
        status: 500, // error code for something that went wrong
        body,
      });

      const result = await fetcher({ query: '' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
      expect(result).toEqual({
        data: null,
        errors: [{ message: body.message[0] }],
      });
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
});
