interface CreateGraphqlFetch {
  endpoint?: string;
  authToken?: string;
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

export const createGraphqlFetch = ({
  endpoint = 'https://api.manifold.co/graphql',
  authToken,
}: CreateGraphqlFetch = {}): (<T>(body: GraphqlRequestBody) => Promise<GraphqlResponseBody<T>>) => {
  const graphqlFetch = async <T>(
    requestBody: GraphqlRequestBody
  ): Promise<GraphqlResponseBody<T>> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(requestBody),
    });

    const body = await response.json();

    return body;
  };

  return graphqlFetch;
};

export default createGraphqlFetch({
  authToken: localStorage.getItem('manifold_api_token') || undefined,
});
