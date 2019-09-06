import connection from '../state/connection';
import { PageInfo, Query } from '../types/graphql';

interface PageAggregator<Edge> {
  write: (edges: Edge[]) => void;
}

interface Connection<Edge> {
  pageInfo: PageInfo;
  edges: Edge[];
}

interface NextPage {
  first: number;
  after: string;
}

export default async function fetchAllPages<Edge>(
  query: string,
  nextPage: NextPage = { first: 25, after: '' },
  agg: PageAggregator<Edge>,
  getConnection: (q: Query) => Connection<Edge>
) {
  const page = await connection.graphqlFetch({ query, variables: nextPage });

  if (page.errors) {
    throw new Error(`Could not fetch all pages of query: ${query}`);
  }

  if (page.data) {
    const { edges, pageInfo } = getConnection(page.data);
    agg.write(edges);

    if (pageInfo.hasNextPage) {
      const next = { first: nextPage.first, after: pageInfo.endCursor || '' };
      await fetchAllPages(query, next, agg, getConnection);
    }
  }
}

export function createAggregator<T>() {
  const entries: T[] = [];

  return {
    write: (edges: T[]) => {
      entries.push(...edges);
    },
    entries: () => entries,
  };
}
