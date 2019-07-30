import { Connection, connections } from './connections';
import { withAuth } from './auth';

interface CreateRestFetch {
  endpoints?: Connection;
  wait?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

export const createRestFetch = ({
  endpoints = connections.prod,
  wait = 15000,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateRestFetch = {}): (<T>(
  service: keyof Connection,
  endpoint: string,
  body?: object,
  options?: object
) => Promise<T | Error>) => async <T>(
  service: keyof Connection,
  endpoint: string,
  requestBody?: object,
  options?: object
): Promise<T | Error> => {
  const url = `${endpoints[service]}${endpoint}`;
  const start = new Date();

  while (!getAuthToken() && start.getTime() - new Date().getTime() <= wait) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  if (!getAuthToken()) {
    return new Error('No auth token given');
  }
  try {
    const response = await fetch(url as string, {
      ...withAuth(getAuthToken(), options),
      body: JSON.stringify(requestBody),
    });

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
