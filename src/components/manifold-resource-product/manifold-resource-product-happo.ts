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
  // TODO: Make good mocks or rethink the types, this ignore stops the compiler from wanting a complete resource
  // @ts-ignore
  resourceProduct.gqlData = GraphqlResource;

  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};
