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

// fetch calls for all tests (name a resource “error-*” to throw)
fetchMock.mock(/\/id\/resource\//, { status: 200, body: {} });
fetchMock.mock(/\/resources\/(?!\?me).*/, url =>
  url.includes('error')
    ? { status: 404, body: { message: 'resource not found' } }
    : { status: 200, body: Resource }
);
fetchMock.mock(/\/resources\/\?me/, url =>
  url.includes('error')
    ? { status: 404, body: { message: 'no resources' } }
    : { status: 200, body: [Resource] }
);

describe('<manifold-data-rename-button>', () => {
  beforeEach(() => {
    fetchMock.resetHistory();
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

  it('does not fetch resource id on change if set', () => {
    const resourceLabel = 'new-resource';

    const provisionButton = new ManifoldDataRenameButton();
    provisionButton.fetchResourceId = jest.fn();
    provisionButton.resourceLabel = 'old-resource';
    provisionButton.resourceId = '1234';

    provisionButton.labelChange(resourceLabel);
    expect(provisionButton.fetchResourceId).not.toHaveBeenCalled();
  });

  describe('when created without a resource ID', () => {
    it('will fetch the resource id', async () => {
      const resourceLabel = 'test-label';

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
      const resourceLabel = 'error-label';

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
    it('will do nothing if still loading', async () => {
      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            loading=""
            resource-label="test-label"
          >Rename</manifold-data-rename-button>
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
      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            resource-label="test-label"
          >Rename</manifold-data-rename-button>
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

  describe('events', () => {
    it('click', async () => {
      const newLabel = 'success-next';
      const resourceId = 'success-id';
      const resourceLabel = 'success-label';

      const mockClick = jest.fn();
      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
            <manifold-data-rename-button
              new-label="${newLabel}"
              resource-id="${resourceId}"
              resource-label="${resourceLabel}"
            ></manifold-service-card-view>`,
      });

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      page.doc.addEventListener('manifold-renameButton-click', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({ detail: { newLabel, resourceLabel, resourceId } })
      );
    });

    it('invalid: too short', async () => {
      const newLabel = 'x';
      const resourceId = 'invalid-id';
      const resourceLabel = 'invalid-label';

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
            <manifold-data-rename-button
              new-label="${newLabel}"
              resource-id="${resourceId}"
              resource-label="${resourceLabel}"
            ></manifold-service-card-view>`,
      });

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-renameButton-invalid', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message: 'Must be at least 3 characters',
            newLabel,
            resourceLabel,
            resourceId,
          },
        })
      );
    });

    it('invalid: invalid chars', async () => {
      const newLabel = '🦞🦞🦞';
      const resourceId = 'invalid-id';
      const resourceLabel = 'invalid-label';

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
            <manifold-data-rename-button
              new-label="${newLabel}"
              resource-id="${resourceId}"
              resource-label="${resourceLabel}"
            ></manifold-service-card-view>`,
      });

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      const mockClick = jest.fn();
      page.doc.addEventListener('manifold-renameButton-invalid', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message:
              'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
            newLabel,
            resourceLabel,
            resourceId,
          },
        })
      );
    });

    it('error', async () => {
      const newLabel = 'error-next';
      const resourceId = 'error-id';
      const resourceLabel = 'error-label';

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            new-label="${newLabel}"
            resource-id="${resourceId}"
            resource-label="${resourceLabel}"
          >Rename</manifold-data-rename-button>
        `,
      });

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-renameButton-error', mockClick);
        button.click();
      });

      expect(fetchMock.called(`${connections.prod.marketplace}/resources/${resourceId}`)).toBe(
        true
      );
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { message: 'resource not found', newLabel, resourceLabel, resourceId },
        })
      );
    });

    it('success', async () => {
      const newLabel = 'success-next';
      const resourceId = 'success-id';
      const resourceLabel = 'success-label';

      const page = await newSpecPage({
        components: [ManifoldDataRenameButton],
        html: `
          <manifold-data-rename-button
            new-label="${newLabel}"
            resource-id="${resourceId}"
            resource-label="${resourceLabel}"
          >Rename</manifold-data-rename-button>
        `,
      });

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-renameButton-success', mockClick);
        button.click();
      });

      expect(fetchMock.called(`${connections.prod.marketplace}/resources/${resourceId}`)).toBe(
        true
      );
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `${resourceLabel} renamed to ${newLabel}`,
            newLabel,
            resourceLabel,
            resourceId,
          },
        })
      );
    });
  });
});
