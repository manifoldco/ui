import { ManifoldDataManageButton } from './manifold-data-manage-button';

describe('<manifold-data-manage-button>', () => {
  it('fetches resource by name on load', () => {
    const resourceName = 'my-resource';

    const manageButton = new ManifoldDataManageButton();
    manageButton.fetchResourceId = jest.fn();
    manageButton.resourceName = resourceName;
    manageButton.componentWillLoad();
    expect(manageButton.fetchResourceId).toHaveBeenCalledWith(resourceName);
  });

  it('fetches resource by name on change', () => {
    const newResource = 'new-resource';

    const manageButton = new ManifoldDataManageButton();
    manageButton.fetchResourceId = jest.fn();
    manageButton.resourceName = 'old-resource';
    manageButton.resourceChange(newResource);
    expect(manageButton.fetchResourceId).toHaveBeenCalledWith(newResource);
  });
});
