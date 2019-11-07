import { EventEmitter } from '@stencil/core';
import { Connection, connections } from './connections';
import { withAuth, waitForAuthToken } from './auth';
import { report } from './errorReport';

export interface CreateRestFetch {
  endpoints?: () => Connection;
  wait?: () => number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
  onReady?: () => Promise<unknown>;
}

interface RestFetchArguments {
  service: keyof Connection;
  endpoint: string;
  body?: object;
  options?: Omit<RequestInit, 'body'>;
  emitter?: EventEmitter;
}

interface RestFetchEventDetail {
  type: 'manifold-rest-fetch-duration';
  endpoint: string;
  duration: number;
  status: number;
  errorMessage?: string;
}

type Success = undefined;

export type RestFetch = <T>(args: RestFetchArguments) => Promise<T | Success>;

export function createRestFetch({
  endpoints = () => connections.prod,
  wait = () => 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
  onReady = () => new Promise(resolve => resolve()),
}: CreateRestFetch): RestFetch {
  async function restFetch<T>(args: RestFetchArguments, attempts: number): Promise<T | Success> {
    await onReady();

    const rttStart = performance.now();

    const token = getAuthToken();
    const options = token ? withAuth(token, args.options) : args.options;

    const response = await fetch(`${endpoints()[args.service]}${args.endpoint}`, {
      ...options,
      body: JSON.stringify(args.body),
    }).catch((e: Response) => {
      /* Handle unexpected errors */
      report({ message: `${e.statusText || e.status}` });
      return Promise.reject(e);
    });

    /* Handle successful responses */
    if ([202, 203, 204].includes(response.status)) {
      return undefined;
    }

    /* Handle expected errors */
    if (response.status === 401) {
      setAuthToken('');
      report({ message: `${response.statusText || response.status}` });
      if (attempts < retries) {
        return waitForAuthToken(getAuthToken, wait(), () => restFetch(args, attempts + 1));
      }

      throw new Error('Auth token expired');
    }

    const body = await response.json();

    const fetchDuration = performance.now() - rttStart;
    const detail: RestFetchEventDetail = {
      type: 'manifold-rest-fetch-duration',
      endpoint: args.endpoint,
      duration: fetchDuration,
      status: response.status,
    };

    let message: string | undefined;
    if (Array.isArray(body) && body.length > 0) {
      message = body[0].message;
    } else if (typeof body === 'object') {
      message = body.message;
    }
    if (message) {
      detail.errorMessage = message;
    }
    if (args.emitter) {
      args.emitter.emit(detail);
    } else {
      document.dispatchEvent(
        new CustomEvent('manifold-rest-fetch-duration', {
          bubbles: true,
          detail,
        })
      );
    }

    if (response.status >= 200 && response.status < 300) {
      return body;
    }

    // Sometimes messages are an array, sometimes they aren’t. Different strokes!
    report({
      code: response.status.toString(),
      message,
    });
    throw new Error(message);
  }

  return function(args: RestFetchArguments) {
    return restFetch(args, 0);
  };
}
