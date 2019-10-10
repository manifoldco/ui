import productBlitline from '../../spec/mock/blitline/product.json';
import productGenericTagging from '../../spec/mock/generic-tagging/product.json';
import productJawsDB from '../../spec/mock/jawsdb/product.json';
import productLogdna from '../../spec/mock/logdna/product.json';
import productPrefab from '../../spec/mock/prefab/product.json';
import productMailgun from '../../spec/mock/mailgun/product.json';
import productZerosix from '../../spec/mock/zerosix/product.json';
import productZiggeo from '../../spec/mock/ziggeo/product.json';
import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';

export const skeleton = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productJawsDB.body.label;

  const mockGqlFetch = (async (...args) => {
    // Simulate a delay so we see the skeletons
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connection.graphqlFetch(...args);
  }) as GraphqlFetch;

  selector.graphqlFetch = mockGqlFetch;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const blitline = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productBlitline.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const genericTagging = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productGenericTagging.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const jawsDB = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productJawsDB.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const logdna = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productLogdna.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const prefab = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productPrefab.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const mailgun = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productMailgun.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const zerosix = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productZerosix.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const ziggeo = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productZiggeo.body.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const delayedJawsDB = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-plan-selector');
  selector.productLabel = productJawsDB.body.label;
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
  selector.productLabel = productJawsDB.body.label;

  const mockGqlFetch = () =>
    new Promise(resolve => resolve({ data: null, errors: [{ message: 'something went wrong' }] }));

  selector.graphqlFetch = mockGqlFetch as GraphqlFetch;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};
