import { ManifoldDataProductLogo } from './manifold-data-product-logo';

describe('<manifold-data-product-logo>', () => {
  it('fetches product from label on load', () => {
    const productLabel = 'test-product';

    const productLogo = new ManifoldDataProductLogo();
    productLogo.fetchProduct = jest.fn();
    productLogo.productLabel = productLabel;
    productLogo.componentDidLoad();
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
});
