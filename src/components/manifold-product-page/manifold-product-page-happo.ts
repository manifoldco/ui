import jawsdbMock from '../../spec/mock/jawsdb/graphqlProduct.json';

import fromJSON from '../../spec/mock/fromJSON';

export const skeleton = () => {
  const productPage = document.createElement('manifold-product-page');

  document.body.appendChild(productPage);

  return productPage.componentOnReady();
};

export const jawsDB = () => {
  const productPage = document.createElement('manifold-product-page');
  productPage.product = fromJSON(jawsdbMock);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.style.width = '100%';
  buttonWrapper.slot = 'cta';

  const button = document.createElement('manifold-button');
  button.color = 'orange';
  button.textContent = 'Get JawsDB MySQL';

  buttonWrapper.appendChild(button);
  productPage.appendChild(buttonWrapper);
  document.body.appendChild(productPage);

  return productPage.componentOnReady();
};

export const noScreenshots = () => {
  const productPage = document.createElement('manifold-product-page');
  const withoutScreens = { ...jawsdbMock, images: [] };
  productPage.product = fromJSON(withoutScreens);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.style.width = '100%';
  buttonWrapper.slot = 'cta';

  const button = document.createElement('manifold-button');
  button.color = 'orange';
  button.textContent = 'Get JawsDB MySQL';

  buttonWrapper.appendChild(button);
  productPage.appendChild(buttonWrapper);
  document.body.appendChild(productPage);

  return productPage.componentOnReady();
};
