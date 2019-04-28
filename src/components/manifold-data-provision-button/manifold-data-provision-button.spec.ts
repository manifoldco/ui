import { ManifoldDataProvisionButton } from './manifold-data-provision-button';

describe('manifold-resource-status', () => {
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
    provisionButton.resourceName = 'old-product';
    provisionButton.productChange(newProduct);
    expect(provisionButton.fetchProductId).toHaveBeenCalledWith(newProduct);
  });
});
