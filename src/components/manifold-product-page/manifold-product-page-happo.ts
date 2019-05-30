import jawsdbMock from '../../spec/mock/jawsdb/product.json';
import jawsdbProvider from '../../spec/mock/jawsdb/provider.json';

import fromJSON from '../../spec/mock/fromJSON';

export const skeleton = () => {
  const productPage = document.createElement('manifold-product-page');

  document.body.appendChild(productPage);
};

export const jawsDB = () => {
  const productPage = document.createElement('manifold-product-page');
  productPage.product = fromJSON(jawsdbMock);
  productPage.provider = fromJSON(jawsdbProvider);

  const button = document.createElement('manifold-button');
  button.textContent = 'Get JawsDB MySQL';
  button.slot = 'cta';

  productPage.appendChild(button);
  document.body.appendChild(productPage);

  return productPage.componentOnReady();
};
