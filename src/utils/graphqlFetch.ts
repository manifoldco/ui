import { hasExpired } from './expiry';

interface CreateGraphqlFetch {
  endpoint?: string;
  wait?: number;
  getAuthToken?: () => string | undefined;
  setAuthToken?: (token: string) => void;
}

export interface GraphqlRequestBody {
  query?: string;
  mutation?: string;
  variables?: object;
}

interface GraphqlError {
  message: string;
  type: string;
}

export interface GraphqlResponseBody<T> {
  data?: T;
  errors?: GraphqlError[];
}

export const createGraphqlFetch = ({
  endpoint = 'https://api.manifold.co/graphql',
  wait = 15000,
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateGraphqlFetch = {}): (<T>(
  body: GraphqlRequestBody
) => Promise<GraphqlResponseBody<T>>) => async <T>(
  requestBody: GraphqlRequestBody
): Promise<GraphqlResponseBody<T>> => {
  const start = new Date();

  while (!getAuthToken() && !hasExpired(start, wait)) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  if (!getAuthToken()) {
    console.error('No auth token given');
    return {
      errors: [
        {
          type: 'unauthorized',
          message: 'No auth token given',
        },
      ],
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(getAuthToken() ? { authorization: `Bearer ${getAuthToken()}` } : {}),
    },
    body: JSON.stringify(requestBody),
  });

  const body = await response.json();

  if (body.errors) {
    body.errors.forEach((error: GraphqlError) => {
      console.error(error.message);
    });
  }

  if (body.errors && body.errors[0].type === 'unauthorized') {
    // TODO trigger token refresh for manifold-auth-token
    setAuthToken('');
  }

  return body;
};
