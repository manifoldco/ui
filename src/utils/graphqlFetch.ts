import { Query } from '../types/graphql';
import { report } from './errorReport';
import { waitForAuthToken } from './auth';

interface CreateGraphqlFetch {
  endpoint?: () => string;
  env?: () => 'local' | 'stage' | 'prod';
  wait?: () => number;
  retries?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
  onReady?: () => Promise<unknown>;
}

type GraphqlRequest =
  | {
      mutation: string;
      variables?: { [key: string]: string | number | undefined };
    }
  | {
      query: string;
      variables?: { [key: string]: string | number | undefined };
    }; // require query or mutation, but not both

type GraphqlArgs = GraphqlRequest & { element: HTMLElement };

export interface GraphqlError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string;
  extensions?: {
    type?: string;
  };
}

interface GraphqlFetchEventDetail {
  componentName: string;
  duration: number;
  errors?: GraphqlError[];
  request: GraphqlRequest;
  type: 'manifold-graphql-fetch-duration';
  uiVersion: string;
}

export interface GraphqlResponseBody<GraphqlData> {
  data: GraphqlData | null;
  errors?: GraphqlError[];
}

export type GraphqlFetch = <T>(args: GraphqlArgs) => Promise<GraphqlResponseBody<T>>;

export function createGraphqlFetch({
  endpoint = () => 'https://api.manifold.co/graphql',
  env = () => 'prod',
  wait = () => 15000,
  retries = 0,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
  onReady = () => new Promise(resolve => resolve()),
}: CreateGraphqlFetch): GraphqlFetch {
  async function graphqlFetch<T = Query>(
    args: GraphqlArgs,
    attempts: number
  ): Promise<GraphqlResponseBody<T>> {
    await onReady();

    const rttStart = performance.now();
    const { element, ...request } = args;

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
        ...(element ? { 'x-manifold-component': element.tagName } : {}),
        'x-manifold-ui-version': '<@NPM_PACKAGE_VERSION@>',
      },
      body: JSON.stringify(request),
    }).catch((e: Response) => {
      // handle unexpected errors
      report({ message: `${e.statusText || e.status}` }, { env: env(), element });
      return Promise.reject(e);
    });

    const body: GraphqlResponseBody<T> = await response.json();

    // handle non-GQL responses from errors
    if (!body.data && !Array.isArray(body.errors)) {
      const errors = [
        { message: response.statusText, extensions: { type: response.status.toString() } },
      ] as GraphqlError[];

      report(
        {
          code: response.status.toString(),
          message: response.statusText || response.status.toString(),
        },
        { env: env(), element }
      );

      return {
        data: null,
        errors,
      };
    }

    const fetchDuration = performance.now() - rttStart;
    const detail: GraphqlFetchEventDetail = {
      componentName: element.tagName,
      duration: fetchDuration,
      errors: body.errors,
      request,
      type: 'manifold-graphql-fetch-duration',
      uiVersion: '<@NPM_PACKAGE_VERSION@>',
    };

    (element || document).dispatchEvent(
      new CustomEvent('manifold-graphql-fetch-duration', { bubbles: true, detail })
    );

    if (body.errors) {
      body.errors.forEach(e => {
        report(
          {
            code: e.extensions && e.extensions.type,
            message: e.message,
          },
          { env: env(), element }
        );
      });

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

    // return everything to the user
    return body;
  }

  return function(args: GraphqlArgs) {
    return graphqlFetch(args, 0);
  };
}
