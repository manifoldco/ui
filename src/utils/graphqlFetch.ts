interface GraphqlFetch {
  endpoint?: string;
  query: string;
  variables?: object;
  authToken?: string;
}

const graphqlFetch = async ({
  endpoint = 'https://api.manifold.co/graphql',
  query,
  variables,
  authToken,
}: GraphqlFetch) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();

  return body;
};

export default graphqlFetch;
