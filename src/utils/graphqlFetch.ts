type Token = string | undefined;

interface CreateGraphqlFetch {
  endpoint?: string;
  getAuthToken?: () => Token;
  setAuthToken?: (token?: Token) => void;
}

export interface GraphqlRequestBody {
  query?: string;
  mutation?: string;
  variables?: object;
}

export interface GraphqlResponseBody<T> {
  data?: T;
  errors?: object[];
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

    if (body.errors && body.errors[0].message.startsWith('unauthorized')) {
      setAuthToken(undefined);
    }

    return body;
  };

  return graphqlFetch;
};
