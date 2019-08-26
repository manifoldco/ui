import { EventEmitter } from '@stencil/core';
import { report } from './errorReport';
import { waitForAuthToken } from './auth';

interface CreateGraphqlFetch {
  endpoint?: string;
  wait?: number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

type GraphqlArgs =
  | { mutation: string; variables?: object; emitter?: EventEmitter }
  | { query: string; variables?: object; emitter?: EventEmitter }; // require query or mutation, but not both

interface GraphqlError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string;
}

export interface GraphqlResponseBody<T> {
  data: T | null;
  errors?: GraphqlError[];
}

export type GraphqlFetch = <T>(args: GraphqlArgs) => Promise<GraphqlResponseBody<T>>;

export function createGraphqlFetch({
  endpoint = 'https://api.manifold.co/graphql',
  wait = 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateGraphqlFetch): GraphqlFetch {
  async function graphqlFetch<T>(
    args: GraphqlArgs,
    attempts: number
  ): Promise<GraphqlResponseBody<T>> {
    const rttStart = performance.now();
    const { emitter, ...request } = args;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(getAuthToken() ? { authorization: `Bearer ${getAuthToken()}` } : {}),
      },
      body: JSON.stringify(request),
    }).catch((e: Response) => {
      // handle unexpected errors
      report(e);
      return Promise.reject(e);
    });

    const body: GraphqlResponseBody<T> = await response.json();

    // handle unauthenticated error
    if (response.status === 401) {
      // TODO trigger token refresh for manifold-auth-token
      setAuthToken('');
      report(body); // report unauthenticated
      if (attempts < retries) {
        return waitForAuthToken(getAuthToken, wait, () => graphqlFetch(args, attempts + 1));
      }

      throw new Error('Auth token expired');
    }

    // handle non-GQL responses from errors
    if (!body.data && !Array.isArray(body.errors)) {
      const errors = [{ message: response.statusText }] as GraphqlError[];

      report(errors);

      return {
        data: null,
        errors,
      };
    }

    // report errors if any, but continue
    if (body.errors) {
      report(body.errors);
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
