import { hasExpired } from './expiry';
import { report } from './errorReport';

interface CreateGraphqlFetch {
  endpoint?: string;
  wait?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

type graphqlArgs =
  | { mutation: string; variables?: object; isPublic?: boolean }
  | { query: string; variables?: object; isPublic?: boolean }; // require query or mutation, but not both

interface GraphqlError {
  message: string;
  type: string;
}

export interface GraphqlResponseBody<T> {
  data?: T;
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
    const { isPublic, ...request } = args;

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
    });

    // Don’t handle success; we always need data returned

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return body;
    }

    /* Handle expected errors */
    if (response.status === 401) {
      // TODO trigger token refresh for manifold-auth-token
      setAuthToken('');
      report(response);
      throw new Error('Auth token expired');
    }

    // Sometimes messages are an array, sometimes they aren’t. Different strokes!
    report(response);
    const message = Array.isArray(body) ? body[0].message : body.message;
    throw new Error(message);
  };
}
