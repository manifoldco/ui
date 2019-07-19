interface CreateGraphqlFetch {
  endpoint?: string;
  getAuthToken: () => string | undefined;
}

export interface GraphqlRequestBody {
  query?: string;
  mutation?: string;
  variables?: object;
}

export interface GraphqlResponseBody<T> {
  data?: T;
  error?: object;
}

export const createGraphqlFetch = (
  { endpoint = 'https://api.manifold.co/graphql', getAuthToken }: CreateGraphqlFetch = {
    getAuthToken: () => undefined,
  }
): (<T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>) => {
  const graphqlFetch = async <T>(
    requestBody: GraphqlRequestBody
  ): Promise<GraphqlResponseBody<T>> => {
    console.log('GET', getAuthToken());
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(getAuthToken() ? { authorization: `Bearer ${getAuthToken()}` } : {}),
      },
      body: JSON.stringify(requestBody),
    });

    const body = await response.json();

    return body;
  };

  return graphqlFetch;
};
