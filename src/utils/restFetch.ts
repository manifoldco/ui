import { Connection, connections } from './connections';
import { withAuth } from './auth';
import { hasExpired } from './expiry';
import { report } from './errorReport';

export interface CreateRestFetch {
  endpoints?: Connection;
  wait?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

interface RestFetchArguments {
  service: keyof Connection;
  endpoint: string;
  body?: object;
  options?: Omit<RequestInit, 'body'>;
  isPublic?: boolean;
}

type Success = undefined;

export type RestFetch = <T>(args: RestFetchArguments) => Promise<T | Success>;

export function createRestFetch({
  endpoints = connections.prod,
  wait = 15000,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateRestFetch): RestFetch {
  return async function restFetch<T>(args: RestFetchArguments): Promise<T | Success> {
    const start = new Date();

    // TODO: catalog should ALWAYS be able to fetch WITHOUT auth if needed,
    // but this prevents the ability for it to auth altogether. We need both!
    const isCatalog = args.service === 'catalog';
    const isPublic = isCatalog || args.isPublic;

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

    const url = `${endpoints[args.service]}${args.endpoint}`;
    const response = await fetch(url as string, {
      ...withAuth(getAuthToken(), args.options),
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

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return body;
    }

    /* Handle expected errors */
    if (response.status === 401) {
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
