import product from '../../spec/mock/jawsdb/product.json';
import connection from '../../state/connection';
import { RestFetch } from '../../utils/restFetch';

export const skeleton = async () => {
  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;

  const mockFetch = (async (...args) => {
    // Simulate a delay so we see the skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.restFetch(...args);
  }) as RestFetch;

  selector.restFetch = mockFetch;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const jawsDB = async () => {
  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;
  selector.hideUntilReady = false;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const delayedJawsDB = async () => {
  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = product.body.label;
  selector.hideUntilReady = false;

  const mockFetch = (async (...args) => {
    // Even with a delay, we should not see skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.restFetch(...args);
  }) as RestFetch;

  selector.restFetch = mockFetch;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};
