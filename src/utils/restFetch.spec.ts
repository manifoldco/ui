import { EventEmitter } from '@stencil/core';
import fetchMock from 'fetch-mock';

import { createRestFetch } from './restFetch';
import { connections } from './connections';

const nonCatalogServices: (keyof typeof connections.prod)[] = [
  'billing',
  'connector',
  'gateway',
  'marketplace',
  'provisioning',
];

describe('The fetcher created by createRestFetch', () => {
  beforeEach(() => fetchMock.mock('begin:https://analytics.manifold.co', 200));
  afterEach(fetchMock.restore);

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
      service: 'marketplace',
    });

    expect(fetchMock.called('path:/v1/test')).toBe(true);
    expect(result).toEqual(body);
  });

  it('Will reset the auth token on a 401 error', () => {
    const setAuthToken = jest.fn();
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
      setAuthToken,
    });

    fetchMock.mock('path:/v1/test', {
      status: 401,
      body: {},
    });

    expect.assertions(2);
    return fetcher({
      endpoint: '/test',
      service: 'marketplace',
    }).catch(() => {
      expect(fetchMock.called('path:/v1/test')).toBe(true);
      expect(setAuthToken).toHaveBeenCalledWith('');
    });
  });

  it('Will return an error if the fetch returned one', () => {
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

    expect.assertions(2);
    return fetcher({
      endpoint: '/test',
      service: 'marketplace',
    }).catch(result => {
      expect(fetchMock.called('path:/v1/test')).toBe(true);
      expect(result.message).toEqual(body.message);
    });
  });

  it('Will return the an error if the fetch triggered one', () => {
    const err = new Error('ohnoes');
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', { throws: err });

    expect.assertions(2);
    return fetcher({
      endpoint: '/test',
      service: 'marketplace',
    }).catch(result => {
      expect(fetchMock.called('path:/v1/test')).toBe(true);
      expect(result).toEqual(err);
    });
  });

  describe('When a token expires', () => {
    describe('With retries remaining', () => {
      it('Will return the an error if the token is not refreshed', () => {
        const fetcher = createRestFetch({
          wait: () => 1,
          getAuthToken: () => undefined,
          retries: 1,
        });

        fetchMock.mock('path:/v1/test', 401);

        const result = fetcher({
          endpoint: '/test',
          service: 'marketplace',
        });

        expect.assertions(2);
        return result.catch(err => {
          expect(fetchMock.called('path:/v1/test')).toBe(true);
          expect(err.message).toEqual('No auth token given');
        });
      });

      it('Will retry if the token is refreshed', async () => {
        const fetcher = createRestFetch({
          wait: () => 1,
          getAuthToken: () => '12344',
          retries: 1,
        });

        const body = { title: 'test' };

        fetchMock
          .once('path:/v1/test', 401)
          .mock('path:/v1/test', { status: 200, body }, { overwriteRoutes: false });

        const fetch = fetcher({
          endpoint: '/test',
          service: 'marketplace',
        });

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

    describe('Without retries remaining', () => {
      it('Will return the an error if auth token request expired', () => {
        const fetcher = createRestFetch({
          wait: () => 1,
          getAuthToken: () => undefined,
          retries: 0,
        });

        fetchMock.mock('path:/v1/test', 401);

        const result = fetcher({
          endpoint: '/test',
          service: 'marketplace',
        });

        expect.assertions(2);
        return result.catch(err => {
          expect(fetchMock.called('path:/v1/test')).toBe(true);
          expect(err.message).toEqual('Auth token expired');
        });
      });
    });
  });

  it('auths for everything but catalog', () =>
    nonCatalogServices.forEach(async service => {
      const fetcher = createRestFetch({
        wait: () => 1,
        getAuthToken: () => '1234',
      });
      fetchMock.mock('path:/v1/test', 200);
      await fetcher({ endpoint: '/test', service });
      const [, req] = fetchMock.lastCall() as any;
      return expect(req.headers).toEqual({ authorization: 'Bearer 1234' });
    }));

  // TODO: make catalog wait for auth if provided
  // (catalog will auth if token is there like it is in these tests, but won’t wait if it’s not)
  it('auths for catalog if token is present initially', async () => {
    const fetcher = createRestFetch({
      wait: () => 1,
      getAuthToken: () => '1234',
    });
    fetchMock.mock('path:/v1/test', {});
    await fetcher({ endpoint: '/test', service: 'catalog' });
    const [, req] = fetchMock.lastCall() as any;
    expect(req.headers).toEqual({ authorization: 'Bearer 1234' });
  });

  // TODO: add catalog auth in the future, but STILL KEEP ability for unauth’d reqs
  it('doesn’t auth for catalog if token is absent', async () => {
    const fetcher = createRestFetch({} /* no token */);
    fetchMock.mock('path:/v1/test', {});
    await fetcher({ endpoint: '/test', service: 'catalog' });
    const [, req] = fetchMock.lastCall() as any;
    expect(req.headers).toBe(undefined);
  });
  it('emits a metrics event from document when no EventEmitter supplied', async () => {
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', {});

    let event: CustomEvent | undefined;
    window.addEventListener('manifold-rest-fetch-duration', e => {
      event = e as CustomEvent;
    });

    await fetcher({ endpoint: '/test', service: 'marketplace' });
    expect(event && event.detail && event.detail.duration).toBeDefined();
  });
  it('emits a metrics event from an EventEmitter when supplied', async () => {
    const fetcher = createRestFetch({
      getAuthToken: () => '1234',
    });

    fetchMock.mock('path:/v1/test', {});

    const emitter: EventEmitter = {
      emit: jest.fn(),
    };

    await fetcher({ endpoint: '/test', service: 'marketplace', emitter });
    expect((emitter.emit as jest.Mock).mock.calls[0][0]).toMatchObject({
      type: 'manifold-rest-fetch-duration',
    });
  });
});
