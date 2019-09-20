import { EventEmitter } from '@stencil/core';
import { Query } from '../types/graphql';
import { report } from './errorReport';
import { waitForAuthToken } from './auth';
import { gqlSearch } from './gql-min';

interface CreateGraphqlFetch {
  endpoint?: () => string;
  wait?: () => number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
  onReady?: () => Promise<unknown>;
}

interface GraphqlQuery {
  query: string;
  variables?: object;
  emitter?: EventEmitter;
}

interface GraphqlMutation {
  mutation: string;
  variables?: object;
  emitter?: EventEmitter;
}

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

export type GraphqlFetch = (args: GraphqlQuery | GraphqlMutation) => Promise<GraphqlResponseBody>;

export function createGraphqlFetch({
  endpoint = () => 'https://api.manifold.co/graphql',
  wait = () => 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
  onReady = () => new Promise(resolve => resolve()),
}: CreateGraphqlFetch): GraphqlFetch {
  async function graphqlFetch(
    args: GraphqlQuery | GraphqlMutation,
    attempts: number
  ): Promise<GraphqlResponseBody> {
    await onReady();

    const rttStart = performance.now();
    const { emitter, ...request } = args;

    // set up default request
    let url = endpoint();
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Connection: 'keep-alive',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    };

    // if valid token, add to request
    const token = getAuthToken();
    if (token && token !== 'undefined') {
      options.headers = {
        ...options.headers, // thank TypeScript for this dumb spread
        authorization: `Bearer ${token}`,
      };
    }

    // if request is GQL query, and it’s short enough, send as GET
    if ((request as GraphqlQuery).query) {
      const MAX_LENGTH = 2048; // should this be higher?
      const queryUrl = `${url}?${gqlSearch(request)}`;
      if (queryUrl.length < MAX_LENGTH) {
        options.method = 'GET';
        delete options.body;
        url = queryUrl;
      }
    }

    const response = await fetch(url, options).catch((e: Response) => {
      report(e); // handle unexpected errors
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

  return function(args: GraphqlQuery | GraphqlMutation) {
    return graphqlFetch(args, 0);
  };
}
