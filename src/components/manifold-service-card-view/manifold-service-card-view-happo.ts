import product from '../../spec/mock/jawsdb/product';

export const skeleton = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;
  card.skeleton = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const jawsDB = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const free = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;
  card.isFree = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const featured = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;
  card.isFeatured = true;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const cta = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;
  card.innerHTML = `<button slot="cta">CTA Slot</button>`;

  document.body.appendChild(card);

  return card.componentOnReady();
};

export const skeletonWithCTA = async () => {
  const card = document.createElement('manifold-service-card-view');
  card.description = product.tagline;
  card.logo = product.logoUrl;
  card.productId = product.id;
  card.name = product.displayName;
  card.productLabel = product.label;
  card.skeleton = true;
  card.innerHTML = `<button slot="cta">CTA Slot</button>`;

  document.body.appendChild(card);

  return card.componentOnReady();
};
