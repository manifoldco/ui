import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';

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
