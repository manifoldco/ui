import { Query } from '../types/graphql';
import { report } from './errorReport';
import { METRICS_ENABLED } from '../global/settings';
import analytics from '../packages/analytics';
import { waitForAuthToken } from './auth';
import awaitPageVisibility from './awaitPageVisibility';

interface CreateGraphqlFetch {
  endpoint?: () => string;
  env?: () => 'local' | 'stage' | 'prod';
  getAuthToken?: () => string | undefined;
  metrics?: () => boolean;
  onReady?: () => Promise<unknown>;
  retries?: number;
  setAuthToken?: (token: string) => void;
  wait?: () => number;
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
  metrics = () => METRICS_ENABLED,
  getAuthToken = () => undefined,
  onReady = () => new Promise(resolve => resolve()),
  retries = 0,
  setAuthToken = () => {},
  wait = () => 15000,
}: CreateGraphqlFetch): GraphqlFetch {
  async function graphqlFetch<T = Query>(
    args: GraphqlArgs,
    attempts: number
  ): Promise<GraphqlResponseBody<T>> {
    await onReady();
    await awaitPageVisibility();

    const { element, ...request } = args;

    const token = getAuthToken();
    // yes sometimes the auth token can be 'undefined'
    const auth: { [key: string]: string } =
      token && token !== 'undefined' ? { authorization: `Bearer ${token}` } : {};

    const rttStart = performance.now(); // start RTT timer
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
    const rttEnd = performance.now(); // end RTT timer

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

    const detail: GraphqlFetchEventDetail = {
      componentName: element.tagName,
      duration: rttEnd - rttStart,
      errors: body.errors,
      request,
      type: 'manifold-graphql-fetch-duration',
      uiVersion: '<@NPM_PACKAGE_VERSION@>',
    };

    // metric event: rtt_graphql
    (element || document).dispatchEvent(
      new CustomEvent('manifold-graphql-fetch-duration', { bubbles: true, detail })
    );
    // emit metrics event only if permitted
    if (metrics()) {
      analytics(
        {
          name: 'rtt_graphql',
          type: 'event',
          properties: {
            componentName: detail.componentName,
            duration: detail.duration,
            uiVersion: detail.uiVersion,
          },
        },
        { env: env() }
      );
    }

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
