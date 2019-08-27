import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Product, ExpandedPlan } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';

import { ManifoldDataProvisionButton } from './manifold-data-provision-button';
import { createRestFetch } from '../../utils/restFetch';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
const graphqlEndpoint = 'http://test.com/graphql';

async function setup({
  graphqlFetch = createGraphqlFetch({
    endpoint: graphqlEndpoint,
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  }),
  ownerId,
  planLabel,
  productLabel,
  restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  }),
  resourceLabel,
  useAuth = false,
}: {
  ownerId?: string;
  productLabel?: string;
  planLabel?: string;
  graphqlFetch?: any;
  resourceLabel?: string;
  restFetch?: any;
  useAuth?: boolean;
}) {
  const page = await newSpecPage({
    components: [ManifoldDataProvisionButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-provision-button');
  if (ownerId) component.ownerId = ownerId;
  component.graphqlFetch = graphqlFetch;
  component.planLabel = planLabel;
  component.productLabel = productLabel;
  component.resourceLabel = resourceLabel;
  component.restFetch = restFetch;

  if (!page.root) throw new Error('<manifold-data-provision-button> not found in document');
  page.root.appendChild(component);
  await page.waitForChanges();
  return { page, component };
}

describe('<manifold-data-provision-button>', () => {
  const profile = { profile: { id: '1234' } };
  const resourceId = 'abcdefghijklmnopqrstuvwxyz123';

  fetchMock.mock(graphqlEndpoint, { data: { profile } });
  fetchMock.mock(/\/products\//, [Product]);
  fetchMock.mock(/\/plans\//, [ExpandedPlan]);
  fetchMock.mock(/\/resource\//, (_: any, req) => {
    const { label } = JSON.parse(req.body as string);
    return label.includes('error')
      ? { status: 500, body: { message: 'provision failed' } }
      : {
          status: 200,
          body: {
            created_at: '2019-01-01 00:00:00',
            id: resourceId,
            label,
          },
        };
  });

  beforeEach(() => fetchMock.resetHistory());

  describe('v0 API', () => {
    it('[owner-id]: fetches if missing', async () => {
      await setup({ productLabel: 'test', planLabel: 'test' });
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    });

    it('[owner-id]: doesn’t fetch if set', async () => {
      const { page } = await setup({ ownerId: '5678', productLabel: 'test', planLabel: 'test' });
      const provisionButton =
        page.root && page.root.querySelector('manifold-data-provision-button');
      if (!provisionButton) throw new Error('provision button not found');

      expect(fetchMock.called(graphqlEndpoint)).toBe(false);
      expect(provisionButton.ownerId).toEqual('5678');
    });

    it('[plan-label]: fetches by plan label if specified', async () => {
      const planLabel = 'test-plan';
      await setup({ ownerId: 'test-owner', productLabel: 'test-product', planLabel });

      expect(
        fetchMock.called(
          `${connections.prod.catalog}/plans/?product_id=${Product.id}&label=${planLabel}`
        )
      ).toBe(true);
    });

    it('[product-label]: fetches product by label', async () => {
      const productLabel = 'test-product';
      const { page } = await setup({ productLabel });
      const provisionButton =
        page.root && page.root.querySelector('manifold-data-provision-button');
      if (!provisionButton) throw new Error('provision button not found');

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );
      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );
    });

    it('[product-label]: doesn’t fetch if missing', async () => {
      await setup({});
      expect(fetchMock.called(/\/products\//)).toBe(false);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const productLabel = 'click-product';
      const resourceLabel = 'click-resource';

      const mockClick = jest.fn();
      const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });

      const button = page.root && page.root.querySelector('button');
      if (!button) throw new Error('button not found in document');

      // listen for event and fire
      page.doc.addEventListener('manifold-provisionButton-click', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            planId: ExpandedPlan.id,
            productLabel,
            resourceLabel,
          },
        })
      );
    });

    it('invalid: too short', async () => {
      const productLabel = 'click-product';
      const resourceLabel = 'x';

      const mockClick = jest.fn();
      const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });

      const button = page.root && page.root.querySelector('button');
      if (!button) throw new Error('button not found in document');

      // listen for event and fire
      page.doc.addEventListener('manifold-provisionButton-invalid', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message: 'Must be at least 3 characters',
            planId: ExpandedPlan.id,
            productLabel,
            resourceLabel,
          },
        })
      );
    });

    it('invalid: bad characters', async () => {
      const resourceLabel = '🦞🦞🦞';
      const productLabel = 'click-product';

      const mockClick = jest.fn();
      const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });

      const button = page.root && page.root.querySelector('button');
      if (!button) throw new Error('button not found in document');

      // listen for event and fire
      page.doc.addEventListener('manifold-provisionButton-invalid', mockClick);
      button.click();

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message:
              'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
            planId: ExpandedPlan.id,
            productLabel,
            resourceLabel,
          },
        })
      );
    });

    it('error', async () => {
      const resourceLabel = 'error-resource';
      const productLabel = 'error-product';

      const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });

      const button = page.root && page.root.querySelector('button');
      if (!button) throw new Error('button not found in document');

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-provisionButton-error', mockClick);
        button.click();
      });

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            message: 'provision failed',
            planId: ExpandedPlan.id,
            productLabel,
            resourceLabel,
          },
        })
      );
    });

    it('success', async () => {
      const resourceLabel = 'success-resource';
      const productLabel = 'success-product';

      const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });

      const button = page.root && page.root.querySelector('button');
      if (!button) throw new Error('button not found in document');

      const mockClick = jest.fn();
      await new Promise(resolve => {
        // listen for event and fire
        mockClick.mockImplementation(() => resolve());
        page.doc.addEventListener('manifold-provisionButton-success', mockClick);
        button.click();
      });

      expect(mockClick).toBeCalledWith(
        expect.objectContaining({
          detail: {
            createdAt: '2019-01-01 00:00:00',
            message: `${resourceLabel} successfully provisioned`,
            planId: ExpandedPlan.id,
            productLabel,
            resourceId,
            resourceLabel,
          },
        })
      );
    });
  });
});
