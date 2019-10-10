import connection from '../state/connection';
import { PageInfo, Query } from '../types/graphql';
import { GraphqlFetch } from './graphqlFetch';

interface Connection<Edge> {
  pageInfo?: PageInfo;
  edges: Edge[];
}

interface NextPage {
  first: number;
  after: string;
}

interface Args<Edge> {
  query: string;
  nextPage: NextPage;
  getConnection: (q: Query) => Connection<Edge> | null | undefined;
  graphqlFetch?: GraphqlFetch;
}

export class MissingPageInfo extends Error {
  constructor(query: string) {
    const message = `
      You've requested all pages of a GraphQL connection, but you
      forgot to request the pageInfo from the query. To request
      pageInfo, add it as a sibling to the edges part of your query.
      An example query looks like this:

      query LIST_THINGS($first: Int!, $after: String!) {
        things(first: $first, after: $after) {
          edges {
            node {
              id
              label
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }

      Your query was:

      ${query}
    `;

    super(message);
  }
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

  const { edges, pageInfo } = getConnection(page.data) || {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  if (!pageInfo) {
    throw new MissingPageInfo(query);
  }

  if (pageInfo.hasNextPage) {
    const next = { first: nextPage.first, after: pageInfo.endCursor || '' };
    const remaining = await fetchAllPages({ query, nextPage: next, getConnection, graphqlFetch });
    return edges.concat(remaining);
  }

  return edges;
}
