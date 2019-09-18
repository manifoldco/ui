import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Product, ExpandedPlan } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';

import { ManifoldDataProvisionButton } from './manifold-data-provision-button';
import { createRestFetch } from '../../utils/restFetch';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
const graphqlEndpoint = 'http://test.com/graphql';
const profile = { profile: { id: '1234' } };
const resourceId = 'abcdefghijklmnopqrstuvwxyz123';

describe('<manifold-data-provision-button>', () => {
  let page: SpecPage;
  let element: HTMLManifoldDataProvisionButtonElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldDataProvisionButton],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-data-provision-button');
    element.graphqlFetch = createGraphqlFetch({
      endpoint: () => graphqlEndpoint,
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });
    element.restFetch = createRestFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });

    fetchMock.reset();

    fetchMock.mock(graphqlEndpoint, profile);
    fetchMock.mock(/\/products\//, [Product]);
    fetchMock.mock(/\/plans\//, [ExpandedPlan]);
    fetchMock.mock(/\/resource\//, (_: any, req) => {
      const { label } = JSON.parse(req.body as string);
      return label && label.includes('error')
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
  });

  beforeEach(() => fetchMock.resetHistory());

  describe('v0 API', () => {
    it('[owner-id]: fetches if missing', async () => {
      element.productLabel = 'test';
      element.planLabel = 'test';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();
      expect(fetchMock.called(graphqlEndpoint)).toBe(true);
    });

    it('[owner-id]: doesn’t fetch if set', async () => {
      element.ownerId = '5678';
      element.productLabel = 'test';
      element.planLabel = 'test';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      const provisionButton = root.querySelector('manifold-data-provision-button');
      if (!provisionButton) {
        throw new Error('provision button not found');
      }

      expect(fetchMock.called(graphqlEndpoint)).toBe(false);
      expect(provisionButton.ownerId).toEqual('5678');
    });

    it('[plan-label]: fetches by plan label if specified', async () => {
      const planLabel = 'test-plan';
      element.ownerId = 'test-owner';
      element.productLabel = 'test-product';
      element.planLabel = planLabel;
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      expect(
        fetchMock.called(
          `${connections.prod.catalog}/plans/?product_id=${Product.id}&label=${planLabel}`
        )
      ).toBe(true);
    });

    it('[product-label]: fetches product by label', async () => {
      const productLabel = 'test-product';
      element.productLabel = productLabel;
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      const provisionButton = root.querySelector('manifold-data-provision-button');
      if (!provisionButton) {
        throw new Error('provision button not found');
      }

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );
      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );
    });

    it('[product-label]: doesn’t fetch if missing', async () => {
      const root = page.root as HTMLElement;
      root.appendChild(element);
      expect(fetchMock.called(/\/products\//)).toBe(false);
    });

    describe('events', () => {
      it('click', async () => {
        const productLabel = 'click-product';
        const resourceLabel = 'click-resource';

        const mockClick = jest.fn();
        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        element.resourceLabel = resourceLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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

      it('click with no resource label', async () => {
        const productLabel = 'click-product';

        const mockClick = jest.fn();
        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

        // listen for event and fire
        page.doc.addEventListener('manifold-provisionButton-click', mockClick);
        button.click();

        expect(mockClick).toBeCalledWith(
          expect.objectContaining({
            detail: {
              planId: ExpandedPlan.id,
              productLabel,
            },
          })
        );
      });

      it('invalid: too short', async () => {
        const productLabel = 'click-product';
        const resourceLabel = 'x';

        const mockClick = jest.fn();
        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        element.resourceLabel = resourceLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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
        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        element.resourceLabel = resourceLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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
        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        element.resourceLabel = resourceLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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

        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        element.resourceLabel = resourceLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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

      it('success without resource label', async () => {
        const productLabel = 'success-product';

        element.ownerId = 'owner-id';
        element.productLabel = productLabel;
        const root = page.root as HTMLElement;
        root.appendChild(element);
        await page.waitForChanges();

        const button = root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

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
              message: 'successfully provisioned',
              planId: ExpandedPlan.id,
              productLabel,
              resourceId,
            },
          })
        );
      });
    });
  });
});
