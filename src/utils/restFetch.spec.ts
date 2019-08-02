import fetchMock from 'fetch-mock';

import { createRestFetch } from './restFetch';

describe('The fetcher created by createRestFetch', () => {
  const oldSetTimeout = setTimeout;

  beforeEach(() => {
    global.setTimeout = oldSetTimeout;
    fetchMock.restore();
  });

  it('Will return the result of the fetch function if given everything it needs', async () => {
    const body = {
      test: 1,
    };
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', {
      status: 200,
      body,
    });

    const result = await fetcher({
      endpoint: '/test',
      service: 'catalog',
    });

    expect(fetchMock.called('path:/v1/test')).toBeTruthy();
    expect(result).toEqual(body);
  });

  it('Will reset the auth token on an error', async () => {
    const setAuthToken = jest.fn();
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
      setAuthToken,
    });

    fetchMock.mock('path:/v1/test', {
      status: 401,
      body: {},
    });

    await fetcher({
      endpoint: '/test',
      service: 'catalog',
    });

    expect(fetchMock.called('path:/v1/test')).toBeTruthy();
    expect(setAuthToken).toHaveBeenCalledWith('');
  });

  it('Will return an error if the fetch returned one', async () => {
    const body = {
      message: 'oops',
    };
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', {
      status: 500,
      body,
    });

    const result: Error = await fetcher({
      endpoint: '/test',
      service: 'catalog',
    });

    expect(fetchMock.called('path:/v1/test')).toBeTruthy();
    expect(result.message).toEqual(body.message);
  });

  it('Will return the an error if the fetch triggered one', async () => {
    const err = new Error('ohnoes');
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', { throws: err });

    const result: Error = await fetcher({
      endpoint: '/test',
      service: 'catalog',
    });

    expect(fetchMock.called('path:/v1/test')).toBeTruthy();
    expect(result).toEqual(err);
  });

  it('Will return the an error if auth token request expired', async () => {
    // @ts-ignore
    global.setTimeout = jest.fn(call => call());
    const fetcher = createRestFetch({
      wait: 1,
      getAuthToken: () => undefined,
    });

    fetchMock.mock('path:/v1/test', 200);

    const result: Error = await fetcher({
      endpoint: '/test',
      service: 'catalog',
    });

    expect(fetchMock.called('path:/v1/test')).toBeFalsy();
    expect(result.message).toEqual('No auth token given');
  });
});
