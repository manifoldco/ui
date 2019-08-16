import { EventEmitter } from '@stencil/core';
import { hasExpired } from './expiry';
import { report } from './errorReport';

interface CreateGraphqlFetch {
  endpoint?: string;
  wait?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

type graphqlArgs =
  | { mutation: string; variables?: object; isPublic?: boolean; emitter?: EventEmitter }
  | { query: string; variables?: object; isPublic?: boolean; emitter?: EventEmitter }; // require query or mutation, but not both

interface GraphqlError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string;
}

export interface GraphqlResponseBody<T> {
  data: T | null;
  errors?: GraphqlError[];
}

export type GraphqlFetch = <T>(args: graphqlArgs) => Promise<GraphqlResponseBody<T>>;

export function createGraphqlFetch({
  endpoint = 'https://api.manifold.co/graphql',
  wait = 15000,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateGraphqlFetch): GraphqlFetch {
  return async function graphqlFetch<T>(args: graphqlArgs): Promise<GraphqlResponseBody<T>> {
    const start = new Date();
    const { isPublic, emitter, ...request } = args;

    if (!isPublic) {
      while (!getAuthToken() && !hasExpired(start, wait)) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      if (!getAuthToken()) {
        const detail = { message: 'No auth token given' };
        report(detail);
        throw new Error(detail.message);
      }
    }

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
      report(response); // report unauthenticated
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

    const fetchDuration = new Date().getTime() - start.getTime();
    if (emitter) {
      emitter.emit({
        type: 'graphql-fetch-duration',
        request,
        duration: fetchDuration,
      });
    } else {
      document.dispatchEvent(
        new CustomEvent('graphql-fetch-duration', {
          detail: { request, duration: fetchDuration },
        })
      );
    }

    // return everything to the user
    return body;
  };
}
