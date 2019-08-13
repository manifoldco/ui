import product from '../../spec/mock/jawsdb/product.json';
import fromJSON from '../../spec/mock/fromJSON';

const { id, body } = fromJSON(product);

export const skeleton = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = body.tagline;
  card.logo = body.logo_url;
  card.productId = id;
  card.name = body.name;
  card.productLabel = body.label;
  card.skeleton = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const jawsDB = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = body.tagline;
  card.logo = body.logo_url;
  card.productId = id;
  card.name = body.name;
  card.productLabel = body.label;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const free = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = body.tagline;
  card.logo = body.logo_url;
  card.productId = id;
  card.name = body.name;
  card.productLabel = body.label;
  card.isFree = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const featured = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = body.tagline;
  card.logo = body.logo_url;
  card.productId = id;
  card.name = body.name;
  card.productLabel = body.label;
  card.isFeatured = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};
