import fetchMock from 'fetch-mock';

import { createGraphqlFetch } from './graphqlFetch';

describe('The fetcher created by createGraphqlFetch', () => {
  const oldSetTimeout = setTimeout;
  const graphqlEndpoint = 'http://test.test/graphql';

  beforeEach(() => {
    global.setTimeout = oldSetTimeout;
    fetchMock.restore();
  });

  it('defaults to api.manifold.co/graphql', async () => {
    const fetcher = createGraphqlFetch({
      /* no endpoint */
    });
    fetchMock.mock('https://api.manifold.co/graphql', { status: 200, body: {} });
    await fetcher({ query: '', isPublic: true });
    expect(fetchMock.called('https://api.manifold.co/graphql')).toBeTruthy();
  });

  it('Will return the result of the fetch function if given everything it needs', async () => {
    const body = {
      test: 1,
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

    expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
    expect(result).toEqual(body);
  });

  it('Will reset the auth token on an error', () => {
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
      expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
      expect(setAuthToken).toHaveBeenCalledWith('');
      expect(result).toEqual(new Error('Auth token expired'));
    });
  });

  it('Will return an error if the fetch returned one', () => {
    const body = {
      errors: [
        {
          type: 'internal',
          message: 'oops',
        },
      ],
    };
    const fetcher = createGraphqlFetch({
      endpoint: graphqlEndpoint,
      getAuthToken: () => '1234',
    });

    fetchMock.mock(graphqlEndpoint, {
      status: 500,
      body,
    });

    expect.assertions(2);
    return fetcher({ query: '' }).catch(result => {
      expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
      expect(result).toEqual(new Error());
    });
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
      expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
      expect(result).toEqual(err);
    });
  });

  it('Will return an error if auth token request expired', () => {
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
      expect(fetchMock.called(graphqlEndpoint)).toBeFalsy();
      expect(result).toEqual(new Error('No auth token given'));
    });
  });
});
