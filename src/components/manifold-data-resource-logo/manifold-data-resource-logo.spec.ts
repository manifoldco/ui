import { ManifoldDataResourceLogo } from './manifold-data-resource-logo';

describe('<manifold-data-resource-logo>', () => {
  it('fetches resource on load', () => {
    const resourceLabel = 'my-resource';

    const productLogo = new ManifoldDataResourceLogo();
    productLogo.fetchResource = jest.fn();
    productLogo.resourceLabel = resourceLabel;
    productLogo.componentDidLoad();
    expect(productLogo.fetchResource).toHaveBeenCalledWith(resourceLabel);
  });

  it('fetches resource on change', () => {
    const newResource = 'new-resource';

    const productLogo = new ManifoldDataResourceLogo();
    productLogo.fetchResource = jest.fn();
    productLogo.resourceLabel = 'old-resource';
    productLogo.resourceChange(newResource);
    expect(productLogo.fetchResource).toHaveBeenCalledWith(newResource);
  });
});
