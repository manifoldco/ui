import { ManifoldProduct } from './manifold-product';

describe('<manifold-product>', () => {
  it('fetches product by label on load', () => {
    const productLabel = 'product-label';

    const product = new ManifoldProduct();
    product.fetchProduct = jest.fn();
    product.productLabel = productLabel;
    product.componentDidLoad();
    expect(product.fetchProduct).toHaveBeenCalledWith(productLabel);
  });

  it('fetches product by label on change', () => {
    const newProduct = 'new-label';

    const product = new ManifoldProduct();
    product.fetchProduct = jest.fn();
    product.productLabel = 'old-product';
    product.productChange(newProduct);
    expect(product.fetchProduct).toHaveBeenCalledWith(newProduct);
  });
});
