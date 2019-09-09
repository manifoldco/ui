import connection from '../state/connection';
import { PageInfo, Query } from '../types/graphql';

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
}

export default async function fetchAllPages<Edge>({
  query,
  nextPage = { first: 25, after: '' },
  getConnection,
}: Args<Edge>): Promise<Edge[]> {
  const page = await connection.graphqlFetch({ query, variables: nextPage });

  if (page.errors) {
    throw new Error(`Could not fetch all pages of query: ${query}`);
  }

  if (page.data) {
    const { edges, pageInfo } = getConnection(page.data);

    if (pageInfo.hasNextPage) {
      const next = { first: nextPage.first, after: pageInfo.endCursor || '' };
      const remaining = await fetchAllPages({ query, nextPage: next, getConnection });
      return edges.concat(remaining);
    }

    return edges;
  }

  return [];
}
