import { connection } from '../../global/app';
import { GraphqlFetch, GraphqlResponseBody } from '../../utils/graphqlFetch';
import { ProductsQuery } from '../../types/graphql';

export const skeleton = () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const grid = document.createElement('manifold-marketplace');

  const mockFetch = (async (...args) => {
    // Simulate a delay so we see the skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  grid.graphqlFetch = mockFetch;

  document.body.appendChild(grid);

  return grid.componentOnReady();
};

export const allProducts = () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const grid = document.createElement('manifold-marketplace');
  grid.hideUntilReady = true;

  document.body.appendChild(grid);

  return grid.componentOnReady();
};

export const mockedProducts = () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const grid = document.createElement('manifold-marketplace');
  grid.hideUntilReady = true;
  grid.graphqlFetch = (async (): Promise<GraphqlResponseBody<ProductsQuery>> => ({
    data: {
      products: {
        edges: [
          {
            node: {
              id: '1234',
              label: 'test',
              displayName: 'Test',
              logoUrl: 'https://www.placecage.com/c/200/300',
              tagline: 'Testing',
              categories: [
                {
                  label: 'cms',
                },
              ],
              plans: {
                edges: [],
              },
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
        },
      },
    },
  })) as GraphqlFetch;

  document.body.appendChild(grid);

  return grid.componentOnReady();
};

export const delayedProducts = () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const grid = document.createElement('manifold-marketplace');
  grid.hideUntilReady = true;

  const mockFetch = (async (...args) => {
    // Even with a delay, we should not see skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  grid.graphqlFetch = mockFetch;

  document.body.appendChild(grid);

  return grid.componentOnReady();
};
