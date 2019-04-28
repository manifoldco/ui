import { ManifoldDataProvisionButton } from './manifold-data-provision-button';

describe('<manifold-data-provision-button>', () => {
  it('fetches product id on load', () => {
    const productLabel = 'test-product';

    const provisionButton = new ManifoldDataProvisionButton();
    provisionButton.fetchProductId = jest.fn();
    provisionButton.productLabel = productLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchProductId).toHaveBeenCalledWith(productLabel);
  });

  it('fetches product id on change', () => {
    const newProduct = 'new-product';

    const provisionButton = new ManifoldDataProvisionButton();
    provisionButton.fetchProductId = jest.fn();
    provisionButton.productLabel = 'old-product';
    provisionButton.productChange(newProduct);
    expect(provisionButton.fetchProductId).toHaveBeenCalledWith(newProduct);
  });
});
