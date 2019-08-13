export const skeleton = () => {
  const resourceProduct = document.createElement('manifold-resource-product');
  document.body.appendChild(resourceProduct);
  return resourceProduct.componentOnReady();
};
