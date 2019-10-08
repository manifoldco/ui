import { resource } from '../../spec/mock/graphql';

export const skeleton = () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};

export const loadedResource = async () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  await resourceProduct.componentOnReady();

  resourceProduct.gqlData = resource;
  resourceProduct.loading = false;

  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};
