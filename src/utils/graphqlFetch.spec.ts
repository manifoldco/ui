import fetchMock from 'fetch-mock';

import { createGraphqlFetch } from './graphqlFetch';

describe('The fetcher created by createGraphqlFetch', () => {
  const oldSetTimeout = setTimeout;
  const graphqlEndpoint = 'http://test.test/graphql';

  beforeEach(() => {
    global.setTimeout = oldSetTimeout;
    fetchMock.restore();
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

    const result = await fetcher({});

    expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
    expect(result).toEqual(body);
  });

  it('Will reset the auth token on an error', async () => {
    const body = {
      errors: [
        {
          type: 'unauthorized',
        },
      ],
    };
    const setAuthToken = jest.fn();
    const fetcher = createGraphqlFetch({
      endpoint: graphqlEndpoint,
      getAuthToken: () => '1234',
      setAuthToken,
    });

    fetchMock.mock(graphqlEndpoint, {
      status: 200,
      body,
    });

    const result = await fetcher({});

    expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
    expect(setAuthToken).toHaveBeenCalledWith('');
    expect(result).toEqual(body);
  });

  it('Will return an error if the fetch returned one', async () => {
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
      status: 200,
      body,
    });

    const result = await fetcher({});

    expect(fetchMock.called(graphqlEndpoint)).toBeTruthy();
    expect(result).toEqual(body);
  });

  it('Will return the an error if auth token request expired', async () => {
    // @ts-ignore
    global.setTimeout = jest.fn(call => call());
    const fetcher = createGraphqlFetch({
      endpoint: graphqlEndpoint,
      wait: 1,
      getAuthToken: () => undefined,
    });

    fetchMock.mock(graphqlEndpoint, 200);

    const result = await fetcher({});

    expect(fetchMock.called(graphqlEndpoint)).toBeFalsy();
    expect(result).toEqual({
      errors: [
        {
          type: 'unauthorized',
          message: 'No auth token given',
        },
      ],
    });
  });
});
