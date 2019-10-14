import resource from '../../spec/mock/elegant-cms/resource';

export const skeleton = () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};

export const loadedResource = async () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  document.body.appendChild(resourceProduct);
  await resourceProduct.componentOnReady();

  resourceProduct.gqlData = resource;
  resourceProduct.loading = false;

  return resourceProduct.componentOnReady();
};
