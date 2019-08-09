import { Connection, connections } from './connections';
import { withAuth } from './auth';
import { hasExpired } from './expiry';

interface CreateRestFetch {
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
}

export type RestFetch = <T>(args: RestFetchArguments) => Promise<T | Error>;

export const createRestFetch = ({
  endpoints = connections.prod,
  wait = 15000,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateRestFetch = {}): RestFetch => async (args: RestFetchArguments) => {
  const url = `${endpoints[args.service]}${args.endpoint}`;
  const start = new Date();

  // TODO: catalog should ALWAYS be able to fetch WITHOUT auth if needed,
  // but this prevents the ability for it to auth altogether. We need both!
  const isCatalog = args.service === 'catalog';

  if (!isCatalog) {
    while (!getAuthToken() && !hasExpired(start, wait)) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (!getAuthToken()) {
      return new Error('No auth token given');
    }
  }

  try {
    const response = await fetch(url as string, {
      ...withAuth(getAuthToken(), args.options),
      body: JSON.stringify(args.body),
    });

    if ([202, 203, 204].includes(response.status)) {
      return {};
    }

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return body;
    }
    if (response.status === 401) {
      setAuthToken('');
    }

    // Sometimes messages are an array, sometimes they aren’t. Different strokes!
    const message = Array.isArray(body) ? body[0].message : body.message;
    return new Error(message);
  } catch (e) {
    return e;
  }
};
