import products from '../../spec/mock/products.json';
import fromJSON from '../../spec/mock/fromJSON';

export const skeleton = () => {
  const grid = document.createElement('manifold-marketplace-grid');

  document.body.appendChild(grid);

  return grid.componentOnReady();
};

export const allProducts = () => {
  const grid = document.createElement('manifold-marketplace-grid');
  grid.services = fromJSON(products);
  grid.freeProducts = [];

  document.body.appendChild(grid);

  return grid.componentOnReady();
};
