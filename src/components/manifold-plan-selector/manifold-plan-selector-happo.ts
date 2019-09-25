import product from '../../spec/mock/jawsdb/product.json';
import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';

export const skeleton = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;

  const mockGqlFetch = (async (...args) => {
    // Simulate a delay so we see the skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  selector.graphqlFetch = mockGqlFetch;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const jawsDB = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const delayedJawsDB = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;
  selector.hideUntilReady = true;

  const mockGqlFetch = (async (...args) => {
    // Even with a delay, we should not see skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  selector.graphqlFetch = mockGqlFetch;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const planError = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;

  const mockGqlFetch = (async () => ({
    data: null,
    errors: [{ message: 'Something went wrong' }],
  })) as GraphqlFetch;

  selector.graphqlFetch = mockGqlFetch;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};
