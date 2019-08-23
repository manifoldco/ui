import { EventEmitter } from '@stencil/core';
import { Connection, connections } from './connections';
import { withAuth, waitForAuthToken } from './auth';
import { report } from './errorReport';

export interface CreateRestFetch {
  endpoints?: Connection;
  wait?: number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

interface RestFetchArguments {
  service: keyof Connection;
  endpoint: string;
  body?: object;
  options?: Omit<RequestInit, 'body'>;
  isPublic?: boolean;
  emitter?: EventEmitter;
}

type Success = undefined;

export type RestFetch = <T>(args: RestFetchArguments) => Promise<T | Success>;

export function createRestFetch({
  endpoints = connections.prod,
  wait = 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateRestFetch): RestFetch {
  async function restFetch<T>(args: RestFetchArguments, attempts: number): Promise<T | Success> {
    const rttStart = performance.now();

    // TODO: catalog should ALWAYS be able to fetch WITHOUT auth if needed,
    // but this prevents the ability for it to auth altogether. We need both!
    const isCatalog = args.service === 'catalog';
    const isPublic = (isCatalog && args.isPublic !== false) || args.isPublic;

    if (!isPublic && !getAuthToken()) {
      return waitForAuthToken(getAuthToken, wait, () => restFetch(args, attempts));
    }

    const options = isPublic ? args.options : withAuth(getAuthToken(), args.options);
    const response = await fetch(`${endpoints[args.service]}${args.endpoint}`, {
      ...options,
      body: JSON.stringify(args.body),
    }).catch((e: Response) => {
      /* Handle unexpected errors */
      report(e);
      return Promise.reject(e);
    });

    /* Handle successful responses */
    if ([202, 203, 204].includes(response.status)) {
      return undefined;
    }

    /* Handle expected errors */
    if (response.status === 401) {
      setAuthToken('');
      report(response);
      if (attempts < retries) {
        return restFetch(args, attempts + 1);
      }

      throw new Error('Auth token expired');
    }

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      const fetchDuration = performance.now() - rttStart;
      if (args.emitter) {
        args.emitter.emit({
          type: 'manifold-rest-fetch-duration',
          endpoint: args.endpoint,
          duration: fetchDuration,
        });
      } else {
        document.dispatchEvent(
          new CustomEvent('manifold-rest-fetch-duration', {
            bubbles: true,
            detail: { endpoint: args.endpoint, duration: fetchDuration },
          })
        );
      }
      return body;
    }

    // Sometimes messages are an array, sometimes they aren’t. Different strokes!
    report(response);
    const message = Array.isArray(body) ? body[0].message : body.message;
    throw new Error(message);
  }

  return function(args: RestFetchArguments) {
    return restFetch(args, 0);
  };
}
