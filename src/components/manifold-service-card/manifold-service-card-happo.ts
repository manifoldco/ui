import productBlitline from '../../spec/mock/blitline/product';
import productGenericTagging from '../../spec/mock/generic-tagging/product';
import productJawsDB from '../../spec/mock/jawsdb/product';
import productLogdna from '../../spec/mock/logdna/product';
import productPrefab from '../../spec/mock/prefab/product';
import productMailgun from '../../spec/mock/mailgun/product';
import productZiggeo from '../../spec/mock/ziggeo/product';
import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';

export const skeleton = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productJawsDB.label;

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

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productBlitline.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const genericTagging = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productGenericTagging.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const jawsDB = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productJawsDB.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const logdna = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productLogdna.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const prefab = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productPrefab.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const mailgun = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productMailgun.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};

export const ziggeo = async () => {
  const conn = document.createElement('manifold-connection');
  document.body.appendChild(conn);

  const selector = document.createElement('manifold-service-card');
  selector.productLabel = productZiggeo.label;
  selector.hideUntilReady = true;

  document.body.appendChild(selector);

  await selector.componentOnReady();
};
