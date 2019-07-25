interface CreateGraphqlFetch {
  endpoint?: string;
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
  getAuthToken = () => undefined,
  setAuthToken = () => {},
}: CreateGraphqlFetch = {}): (<T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>) => {
  const graphqlFetch = async <T>(
    requestBody: GraphqlRequestBody
  ): Promise<GraphqlResponseBody<T>> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

  return graphqlFetch;
};
