import { ManifoldResourceStatus } from './manifold-resource-status';

describe('manifold-resource-status', () => {
  it('fetches resource by name on load', () => {
    const resourceName = 'my-resource';

    const resourceStatus = new ManifoldResourceStatus();
    resourceStatus.fetchResourceByName = jest.fn();
    resourceStatus.resourceName = resourceName;
    resourceStatus.componentWillLoad();
    expect(resourceStatus.fetchResourceByName).toHaveBeenCalledWith(resourceName);
  });

  it('fetches resource by name on change', () => {
    const newResource = 'new-resource';

    const resourceStatus = new ManifoldResourceStatus();
    resourceStatus.fetchResourceByName = jest.fn();
    resourceStatus.resourceName = 'old-resource';
    resourceStatus.resourceChange(newResource);
    expect(resourceStatus.fetchResourceByName).toHaveBeenCalledWith(newResource);
  });
});
