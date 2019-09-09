import connection from '../state/connection';
import { PageInfo, Query } from '../types/graphql';
import { GraphqlFetch } from '../utils/graphqlFetch';

interface Connection<Edge> {
  pageInfo: PageInfo;
  edges: Edge[];
}

interface NextPage {
  first: number;
  after: string;
}

interface Args<Edge> {
  query: string;
  nextPage: NextPage;
  getConnection: (q: Query) => Connection<Edge>;
  graphqlFetch?: GraphqlFetch;
}

export default async function fetchAllPages<Edge>({
  query,
  nextPage,
  getConnection,
  graphqlFetch = connection.graphqlFetch,
}: Args<Edge>): Promise<Edge[]> {
  const page = await graphqlFetch({ query, variables: nextPage });

  if (page.errors || !page.data) {
    throw new Error(`Could not fetch all pages of query: ${query}`);
  }

  const { edges, pageInfo } = getConnection(page.data);

  if (pageInfo.hasNextPage) {
    const next = { first: nextPage.first, after: pageInfo.endCursor || '' };
    const remaining = await fetchAllPages({ query, nextPage: next, getConnection });
    return edges.concat(remaining);
  }

  return edges;
}
