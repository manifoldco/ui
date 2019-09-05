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
  key: keyof Query
) {
  const page = await connection.graphqlFetch({ query, variables: nextPage });
  const data = page.data && (page.data[key] as Partial<Connection<Edge>>);
  if (data) {
    agg.write(data.edges || []);
    if (data.pageInfo && data.pageInfo.hasNextPage) {
      const page = { first: nextPage.first, after: data.pageInfo.endCursor || '' };
      await fetchAllPages(query, page, agg, key);
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

fetchAllPages(query, { first: 3, after: '' }, aggregator, 'categories').then(() => {
  console.log(aggregator.entries().map(e => e.node));
});
