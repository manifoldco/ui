import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';

import { ManifoldDataDeprovisionButton } from './manifold-data-deprovision-button';

describe('<manifold-data-provision-button>', () => {
  it('fetches the resource id on load if not set', () => {
    const resourceName = 'test-resource';

    const provisionButton = new ManifoldDataDeprovisionButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceName = resourceName;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceName);
  });

  it('does not fetch the resource id on load if set', () => {
    const resourceName = 'test-resource';

    const provisionButton = new ManifoldDataDeprovisionButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceName = resourceName;
    provisionButton.resourceId = resourceName;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  it('fetches resource id on change if not set', () => {
    const resourceName = 'new-resource';

    const provisionButton = new ManifoldDataDeprovisionButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceName = 'old-resource';

    provisionButton.nameChange(resourceName);
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceName);
  });

  it('does not resource id on change if set', () => {
    const resourceName = 'new-resource';

    const provisionButton = new ManifoldDataDeprovisionButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceName = 'old-resource';
    provisionButton.resourceId = '1234';

    provisionButton.nameChange(resourceName);
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  describe('when created without a resource ID', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the resource id', async () => {
      const resourceName = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceName}`, [
        Resource,
      ]);

      const page = await newSpecPage({
        components: [ManifoldDataDeprovisionButton],
        html: `
          <manifold-data-deprovision-button
            resource-name="${resourceName}"
          >Deprovision</manifold-data-deprovision-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceName}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataDeprovisionButton;
      expect(root.resourceId).toEqual(Resource.id);
    });

    it('will do nothing on a fetch error', async () => {
      const resourceName = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&name=${resourceName}`, []);

      const page = await newSpecPage({
        components: [ManifoldDataDeprovisionButton],
        html: `
          <manifold-data-deprovision-button
            resource-name="${resourceName}"
          >Deprovision</manifold-data-deprovision-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceName}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataDeprovisionButton;
      expect(root.resourceId).not.toEqual(Resource.id);
    });
  });

  describe('When sending a request to deprovision', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    beforeEach(() => {
      fetchMock.mock(/.*\/resources\/.*/, [Resource]);
    });

    it('will trigger a dom event on successful deprovision', async () => {
      fetchMock.mock(`${connections.prod.gateway}/id/resource/${Resource.id}`, 200);

      const page = await newSpecPage({
        components: [ManifoldDataDeprovisionButton],
        html: `
          <manifold-data-deprovision-button
            resource-name="test"
          >Deprovision</manifold-data-deprovision-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataDeprovisionButton;
      instance.successEvent.emit = jest.fn();

      await instance.deprovision();

      expect(fetchMock.called(`${connections.prod.gateway}/id/resource/${Resource.id}`)).toBe(true);
      expect(instance.successEvent.emit).toHaveBeenCalledWith({
        message: 'test successfully deprovisioned',
        resourceName: 'test',
        resourceId: Resource.id,
      });
    });

    it('will trigger a dom event on failed deprovision', async () => {
      fetchMock.mock(`${connections.prod.gateway}/id/resource/${Resource.id}`, {
        status: 500,
        body: {
          message: 'ohnoes',
        },
      });

      const page = await newSpecPage({
        components: [ManifoldDataDeprovisionButton],
        html: `
          <manifold-data-deprovision-button
            resource-name="test"
          >Provision</manifold-data-deprovision-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataDeprovisionButton;
      instance.errorEvent.emit = jest.fn();

      await instance.deprovision();

      expect(fetchMock.called(`${connections.prod.gateway}/id/resource/${Resource.id}`)).toBe(true);
      expect(instance.errorEvent.emit).toHaveBeenCalledWith({
        message: 'ohnoes',
        resourceName: 'test',
        resourceId: Resource.id,
      });
    });
  });
});
