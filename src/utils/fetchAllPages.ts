import { gql } from '@manifoldco/gql-zero';
import connection from '../state/connection';
import { PageInfo, Query, CategoryEdge } from '../types/graphql';

interface PageAggregator<EdgeType> {
  write: (edges: Array<EdgeType>) => void;
}

interface Connection<Edge> {
  pageInfo: PageInfo;
  edges: Array<Edge>;
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
  if (page.data) {
    const { edges, pageInfo } = getConnection(page.data);
    agg.write(edges);

    if (pageInfo.hasNextPage) {
      const page = { first: nextPage.first, after: pageInfo.endCursor || '' };
      await fetchAllPages(query, page, agg, getConnection);
    }
  }
}

const query = gql`
  query CATEGORIES($first: Int!, $after: String!) {
    categories(first: $first, after: $after) {
      edges {
        node {
          label
          products(first: 10) {
            edges {
              node {
                label
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function agg<T>() {
  let entries: Array<T> = [];

  return {
    write: (edges: Array<T>) => {
      entries.push(...edges);
    },
    entries: () => entries,
  };
}

const aggregator = agg<CategoryEdge>();

fetchAllPages(query, { first: 3, after: '' }, aggregator, (q: Query) => q.categories).then(() => {
  console.log(aggregator.entries().map(e => e.node));
});
