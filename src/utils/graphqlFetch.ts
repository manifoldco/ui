import { EventEmitter } from '@stencil/core';
import { Query } from '../types/graphql';
import { report } from './errorReport';
import { waitForAuthToken } from './auth';

interface CreateGraphqlFetch {
  endpoint?: () => string;
  wait?: () => number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
  onReady?: () => Promise<unknown>;
}

type GraphqlArgs =
  | { mutation: string; variables?: object; emitter?: EventEmitter }
  | { query: string; variables?: object; emitter?: EventEmitter }; // require query or mutation, but not both

export interface GraphqlError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string;
  extensions?: {
    type?: string;
  };
}

export interface GraphqlResponseBody {
  data: Query | null;
  errors?: GraphqlError[];
}

export type GraphqlFetch = (args: GraphqlArgs) => Promise<GraphqlResponseBody>;

export function createGraphqlFetch({
  endpoint = () => 'https://api.manifold.co/graphql',
  wait = () => 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
  onReady = () => new Promise(resolve => resolve()),
}: CreateGraphqlFetch): GraphqlFetch {
  async function graphqlFetch(args: GraphqlArgs, attempts: number): Promise<GraphqlResponseBody> {
    await onReady();

    const rttStart = performance.now();
    const { emitter, ...request } = args;

    const token = getAuthToken();
    // yes sometimes the auth token can be 'undefined'
    const auth: { [key: string]: string } =
      token && token !== 'undefined' ? { authorization: `Bearer ${token}` } : {};

    const response = await fetch(endpoint(), {
      method: 'POST',
      headers: {
        Connection: 'keep-alive',
        'Content-type': 'application/json',
        ...auth,
      },
      body: JSON.stringify(request),
    }).catch((e: Response) => {
      // handle unexpected errors
      report(e);
      return Promise.reject(e);
    });

    const body: GraphqlResponseBody = await response.json();

    // handle non-GQL responses from errors
    if (!body.data && !Array.isArray(body.errors)) {
      const errors = [{ message: response.statusText }] as GraphqlError[];

      report(errors);

      return {
        data: null,
        errors,
      };
    }

    if (body.errors) {
      report(body.errors);

      const authExpired = body.errors.some(e => {
        return e.extensions && e.extensions.type === 'AuthFailed';
      });

      if (authExpired) {
        setAuthToken('');
        if (attempts < retries) {
          return waitForAuthToken(getAuthToken, wait(), () => graphqlFetch(args, attempts + 1));
        }

        throw new Error('Auth token expired');
      }
    }

    const fetchDuration = performance.now() - rttStart;
    if (emitter) {
      emitter.emit({
        type: 'manifold-graphql-fetch-duration',
        request,
        duration: fetchDuration,
      });
    } else {
      document.dispatchEvent(
        new CustomEvent('manifold-graphql-fetch-duration', {
          bubbles: true,
          detail: { request, duration: fetchDuration },
        })
      );
    }

    // return everything to the user
    return body;
  }

  return function(args: GraphqlArgs) {
    return graphqlFetch(args, 0);
  };
}
