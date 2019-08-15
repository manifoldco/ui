import fetchMock from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { ManifoldDataManageButton } from './manifold-data-manage-button';
import { Resource } from '../../spec/mock/marketplace';
import { createRestFetch } from '../../utils/restFetch';
import { connections } from '../../utils/connections';

async function setup(resourceLabel: string) {
  const page = await newSpecPage({
    components: [ManifoldDataManageButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-manage-button');
  component.resourceLabel = resourceLabel;
  component.restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-manage-button>', () => {
  it('fetches resource by name on load', async () => {
    const resourceLabel = 'my-resource';
    const url = `${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`;
    fetchMock.mock(url, [Resource]);
    await setup(resourceLabel);
    expect(fetchMock.called(url)).toBe(true);
    /*
    const resourceName = 'my-resource';

    const manageButton = new ManifoldDataManageButton();
    manageButton.fetchResourceId = jest.fn();
    manageButton.resourceLabel = resourceName;
    manageButton.componentWillLoad();
    expect(manageButton.fetchResourceId).toHaveBeenCalledWith(resourceName);
    */
  });

  it('fetches resource by name on change', () => {
    const newResource = 'new-resource';

    const manageButton = new ManifoldDataManageButton();
    manageButton.fetchResourceId = jest.fn();
    manageButton.resourceLabel = 'old-resource';
    manageButton.resourceChange(newResource);
    expect(manageButton.fetchResourceId).toHaveBeenCalledWith(newResource);
  });
});
