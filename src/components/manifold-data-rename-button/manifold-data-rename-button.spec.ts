import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldDataRenameButton } from './manifold-data-rename-button';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

interface Props {
  disabled?: boolean;
  loading?: boolean;
  newLabel: string;
  ownerId?: string;
  resourceId?: string;
  resourceLabel: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataRenameButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-rename-button');
  component.graphqlFetch = createGraphqlFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  component.disabled = props.disabled;
  component.loading = props.loading;
  component.ownerId = props.ownerId;
  component.newLabel = props.newLabel;
  component.resourceId = props.resourceId;
  component.resourceLabel = props.resourceLabel;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-rename-button>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    // fetch calls for all tests (name a resource “error-*” to throw)
    fetchMock.mock('begin:https://api.manifold.co/graphql', (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      return body.includes('error')
        ? { data: null, errors: [{ message: 'resource not found' }] }
        : { data: resource };
    });
  });

  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[resource-id]: fetches ID if missing', async () => {
      await setup({ newLabel: 'new-label', resourceLabel: 'test-label' });
      expect(fetchMock.called('begin:https://api.manifold.co/graphql')).toBe(true);
    });

    it('[resource-id]: button disabled if missing', async () => {
      const { page } = await setup({
        loading: true,
        newLabel: 'new-label',
        resourceLabel: 'test-label',
      });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[resource-id]: doesn’t fetch ID if set', async () => {
      await setup({ newLabel: 'new-label', resourceId: '12345', resourceLabel: 'test-label' });
      expect(fetchMock.called('begin:https://api.manifold.co/graphql')).toBe(false);
    });

    it('[loading]: button is disabled', async () => {
      const { page } = await setup({
        loading: true,
        newLabel: 'new-label',
        resourceLabel: 'test-label',
      });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[disabled]: button is disabled', async () => {
      const { page } = await setup({
        disabled: true,
        newLabel: 'new-label',
        resourceLabel: 'test-label',
      });
      const button = page.root && page.root.querySelector('button');
      expect(button && button.getAttribute('disabled')).not.toBeNull();
    });

    it('[owner-id]: uses if passed', async () => {
      await setup({ resourceLabel: 'my-resource', newLabel: 'new-label', ownerId: 'my-owner-id' });

      const [[_, firstRequest]] = fetchMock.calls();
      const body = JSON.parse(`${firstRequest && firstRequest.body}`);
      const { variables } = body;

      expect(variables.owner).toBe('my-owner-id');
    });
  });

  describe('v0 events', () => {
    it('click', async () => {
      const newLabel = 'success-next';
      const resourceId = 'success-id';
      const resourceLabel = 'success-label';
      const ownerId = 'success-owner';

      const { page } = await setup({ newLabel, resourceId, resourceLabel, ownerId });

      const mockClick = jest.fn();

      const button = page.root && page.root.querySelector('button');
      if (!button) {
        throw new Error('button not found in document');
      }

      // listen for event and fire
      page.doc.addEventListener('manifold-renameButton-click', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({ detail: { newLabel, resourceLabel, resourceId, ownerId } })
      );
    });

    it('invalid: too short', async () => {
      const newLabel = 'x';
      const resourceId = 'invalid-id';
      const resourceLabel = 'invalid-label';
      const ownerId = 'invalid-owner';
      const { page } = await setup({ newLabel, resourceId, resourceLabel, ownerId });

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
            ownerId,
          },
        })
      );
    });

    it('invalid: invalid chars', async () => {
      const newLabel = '🦞🦞🦞';
      const resourceId = 'invalid-id';
      const resourceLabel = 'invalid-label';
      const ownerId = 'invalid-owner';
      const { page } = await setup({ newLabel, resourceId, resourceLabel, ownerId });

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
            ownerId,
          },
        })
      );
    });

    it('error', async () => {
      const newLabel = 'error-next';
      const resourceId = 'error-id';
      const resourceLabel = 'error-label';
      const ownerId = 'error-owner';
      const { page } = await setup({ newLabel, resourceId, resourceLabel, ownerId });

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

      expect(fetchMock.called('begin:https://api.manifold.co/graphql')).toBe(true);
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { message: 'resource not found', newLabel, resourceLabel, resourceId, ownerId },
        })
      );
    });

    it('success', async () => {
      const newLabel = 'logdna'; // Test relies on logdna here because fetchMock returns the logdna mock resource
      const resourceId = 'success-id';
      const resourceLabel = 'success-label';
      const ownerId = 'success-owner';
      const { page } = await setup({ newLabel, resourceId, resourceLabel, ownerId });

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

      expect(fetchMock.called('begin:https://api.manifold.co/graphql')).toBe(true);
      expect(mockClick).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: `${resourceLabel} renamed to ${newLabel}`,
            newLabel,
            resourceLabel,
            resourceId,
            ownerId,
          },
        })
      );
    });
  });
});
