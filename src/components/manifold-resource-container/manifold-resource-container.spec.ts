import { ManifoldResourceContainer } from './manifold-resource-container';

describe('<manifold-resource-credentials>', () => {
  it('fetches resource on load', () => {
    const resourceLabel = 'my-resource';

    const resourceCreds = new ManifoldResourceContainer();
    resourceCreds.fetchResource = jest.fn();
    resourceCreds.resourceLabel = resourceLabel;
    resourceCreds.componentWillLoad();
    expect(resourceCreds.fetchResource).toHaveBeenCalledWith(resourceLabel);
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
