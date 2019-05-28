import jawsdbMock from '../../spec/mock/jawsdb/product.json';
import fromJSON from '../../spec/mock/fromJSON';

export const skeleton = () => {
  const productPage = document.createElement('manifold-product-page');

  document.body.appendChild(productPage);
};

export const jawsdb = () => {
  const productPage = document.createElement('manifold-product-page');
  productPage.product = fromJSON(jawsdbMock);

  document.body.appendChild(productPage);
};
