import { Resource } from '../../types/graphql';

export const skeleton = () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};

export const loadedResource = () => {
  const GraphqlResource = {
    id: '1234',
    plan: {
      id: '1234',
      product: {
        id: '1234',
        displayName: 'Product',
        tagline: 'Amazing product',
        label: 'product',
        logoUrl: 'https://fillmurray.com/200/200',
      },
    },
  };

  const resourceProduct = document.createElement('manifold-resource-product');
  resourceProduct.loading = false;
  resourceProduct.gqlData = GraphqlResource as Resource;

  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};
