import { ManifoldResourceContainer } from '../manifold-resource-container/manifold-resource-container';

describe('<manifold-resource-credentials>', () => {
  it('fetches resource on load', () => {
    const resourceName = 'my-resource';

    const resourceCreds = new ManifoldResourceContainer();
    resourceCreds.fetchResource = jest.fn();
    resourceCreds.resourceLabel = resourceName;
    resourceCreds.componentWillLoad();
    expect(resourceCreds.fetchResource).toHaveBeenCalledWith(resourceName);
  });

  it('fetches resource  on change', () => {
    const newResource = 'new-resource';

    const resourceCreds = new ManifoldResourceContainer();
    resourceCreds.fetchResource = jest.fn();
    resourceCreds.resourceLabel = 'old-resource';
    resourceCreds.resourceChange(newResource);
    expect(resourceCreds.fetchResource).toHaveBeenCalledWith(newResource);
  });
});
