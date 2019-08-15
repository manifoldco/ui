import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { ManifoldDataRenameButton } from './manifold-data-rename-button';
import { createRestFetch } from '../../utils/restFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
const proto = ManifoldDataRenameButton.prototype as any;
const oldCallback = proto.componentWillLoad;

proto.componentWillLoad = function() {
  (this as any).restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  if (oldCallback) {
    oldCallback.call(this);
  }
};

describe('<manifold-data-rename-button>', () => {
  it('fetches the resource id on load if not set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldDataRenameButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not fetch the resource id on load if set', () => {
    const resourceLabel = 'test-resource';

    const provisionButton = new ManifoldDataRenameButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = resourceLabel;
    provisionButton.resourceId = resourceLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  it('fetches resource id on change if not set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldDataRenameButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).toHaveBeenCalledWith(resourceLabel);
  });

  it('does not resource id on change if set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldDataRenameButton();
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
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="${resourceLabel}"
          >Rename</manifold-data-rename-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataRenameButton;
      expect(root.resourceId).toEqual(Resource.id);
    });

    it('will do nothing on a fetch error', async () => {
      const resourceLabel = 'new-resource';

      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, []);

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="${resourceLabel}"
          >Rename</manifold-data-rename-button>
        `,
      });

      expect(
        fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataRenameButton;
      expect(root.resourceId).not.toEqual(Resource.id);
    });
  });

  describe('When sending a request to rename', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    beforeEach(() => {
      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${Resource.body.label}`, [
        Resource,
      ]);
    });

    it('will trigger a dom event on successful rename', async () => {
      fetchMock.mock(`${connections.prod.marketplace}/resources/${Resource.id}`, Resource);
      fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=test2`, [
        {
          ...Resource,
          body: {
            label: 'test2',
          },
        },
      ]);

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="${Resource.body.label}"
            new-label="test2"
          >Rename</manifold-data-rename-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataRenameButton;
      instance.success.emit = jest.fn();

      await instance.rename();

      expect(fetchMock.called(`${connections.prod.marketplace}/resources/${Resource.id}`)).toBe(
        true
      );
      expect(instance.success.emit).toHaveBeenCalledWith({
        message: `${Resource.body.label} successfully renamed`,
        resourceLabel: Resource.body.label,
        newLabel: 'test2',
        resourceId: Resource.id,
      });
    });

    it('will trigger a dom event on failed rename', async () => {
      fetchMock.mock(`${connections.prod.marketplace}/resources/${Resource.id}`, {
        status: 500,
        body: {
          message: 'ohnoes',
        },
      });

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="${Resource.body.label}"
            new-label="test2"
          >Provision</manifold-data-rename-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataRenameButton;
      instance.error.emit = jest.fn();

      try {
        await instance.rename();
      } catch {
        expect(fetchMock.called(`${connections.prod.marketplace}/resources/${Resource.id}`)).toBe(
          true
        );
        expect(instance.error.emit).toHaveBeenCalledWith({
          message: 'ohnoes',
          resourceLabel: Resource.body.label,
          newLabel: 'test2',
          resourceId: Resource.id,
        });
      }
    });

    it('will do nothing if still loading', async () => {
      fetchMock
        .mock(`${connections.prod.gateway}/id/resource/${Resource.id}`, 200)
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, []);

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            loading=""
            resource-label="test"
          >Provision</manifold-data-rename-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataRenameButton;
      instance.loading = true;

      await instance.rename();

      expect(fetchMock.called(`${connections.prod.gateway}/id/resource/${Resource.id}`)).toBe(
        false
      );
    });

    it('will do nothing if no resourceId is provided', async () => {
      fetchMock
        .mock(`${connections.prod.gateway}/id/resource/${Resource.id}`, 200)
        .mock(`${connections.prod.marketplace}/resources/?me&label=test`, []);

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="test"
          >Provision</manifold-data-rename-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataRenameButton;
      instance.resourceId = undefined;

      await instance.rename();

      expect(fetchMock.called(`${connections.prod.gateway}/id/resource/${Resource.id}`)).toBe(
        false
      );
    });
  });
});
