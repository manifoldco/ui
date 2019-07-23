import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource, Credential } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';

import { ManifoldCredentials } from './manifold-credentials';

describe('<manifold-credentials>', () => {
  it('fetches the resource id on load if not set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not fetch the resource id on load if set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.resourceId = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  it('fetches resource id on change if not set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not resource id on change if set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldCredentials();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';
    provisionButton.resourceId = '1234';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  describe('when created without a resource ID', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the resource id', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, [
        Resource,
      ]);

      const page = await newSpecPage({
        components: [ManifoldCredentials],
        html: `
          <manifold-credentials
            resource-label="${resourceLabel}"
          ></manifold-credentials>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldCredentials;
      expect(root.resourceId).toEqual(Resource.id);
    });

    it('will do nothing on a fetch error', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&name=${resourceLabel}`, []);

      const page = await newSpecPage({
        components: [ManifoldCredentials],
        html: `
          <manifold-credentials
            resource-label="${resourceLabel}"
          ></manifold-credentials>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldCredentials;
      expect(root.resourceId).not.toEqual(Resource.id);
    });
  });

  describe('When requesting credentials', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    beforeEach(() => {
      fetchMock.mock(/.*\/resources\/.*/, [Resource]);
    });

    it('will set the credentials on a successful fetch', async () => {
      fetchMock.mock(`${connections.prod.marketplace}/credentials/?resource_id=${Resource.id}`, [
        Credential,
      ]);

      const page = await newSpecPage({
        components: [ManifoldCredentials],
        html: `
          <manifold-credentials
            resource-label="test"
          ></manifold-credentials>
        `,
      });

      const instance = page.rootInstance as ManifoldCredentials;
      await instance.fetchCredentials();

      expect(
        fetchMock.called(`${connections.prod.marketplace}/credentials/?resource_id=${Resource.id}`)
      ).toBe(true);
      expect(instance.credentials).toEqual([Credential]);
    });

    it('does nothing if the resource ID is not set', async () => {
      fetchMock.mock(`${connections.prod.marketplace}/credentials/?resource_id=${Resource.id}`, [
        Credential,
      ]);

      const page = await newSpecPage({
        components: [ManifoldCredentials],
        html: `
          <manifold-credentials
            resource-label="test"
          ></manifold-credentials>
        `,
      });

      const instance = page.rootInstance as ManifoldCredentials;
      instance.resourceId = '';
      await instance.fetchCredentials();

      expect(
        fetchMock.called(`${connections.prod.marketplace}/credentials/?resource_id=${Resource.id}`)
      ).toBe(false);
      expect(instance.credentials).not.toBeDefined();
    });
  });
});
