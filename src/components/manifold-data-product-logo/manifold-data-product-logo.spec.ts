import { ManifoldDataProductLogo } from './manifold-data-product-logo';

describe('<manifold-data-product-logo>', () => {
  it('fetches product from label on load', () => {
    const productLabel = 'test-product';

    const productLogo = new ManifoldDataProductLogo();
    productLogo.fetchProduct = jest.fn();
    productLogo.productLabel = productLabel;
    productLogo.componentWillLoad();
    expect(productLogo.fetchProduct).toHaveBeenCalledWith(productLabel);
  });

  it('fetches product from label on change', () => {
    const newProduct = 'new-product';

    const productLogo = new ManifoldDataProductLogo();
    productLogo.fetchProduct = jest.fn();
    productLogo.productLabel = 'old-product';
    productLogo.productChange(newProduct);
    expect(productLogo.fetchProduct).toHaveBeenCalledWith(newProduct);
  });

  it('fetches resource on load', () => {
    const resourceLabel = 'my-resource';

    const productLogo = new ManifoldDataProductLogo();
    productLogo.fetchResource = jest.fn();
    productLogo.resourceLabel = resourceLabel;
    productLogo.componentWillLoad();
    expect(productLogo.fetchResource).toHaveBeenCalledWith(resourceLabel);
  });

  it('fetches resource on change', () => {
    const newResource = 'new-resource';

    const productLogo = new ManifoldDataProductLogo();
    productLogo.fetchResource = jest.fn();
    productLogo.resourceLabel = 'old-resource';
    productLogo.resourceChange(newResource);
    expect(productLogo.fetchResource).toHaveBeenCalledWith(newResource);
  });
});
