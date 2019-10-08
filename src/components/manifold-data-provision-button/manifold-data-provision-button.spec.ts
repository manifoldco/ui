import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldDataProvisionButton } from './manifold-data-provision-button';
import { createGraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { product, resource, plan } from '../../spec/mock/graphql';

/* eslint-disable @typescript-eslint/no-explicit-any */
const graphqlEndpoint = 'http://test.com/graphql';
const profile = { profile: { id: '1234' } };

interface Props {
  ownerId?: string;
  planId?: string;
  productId?: string;
  productLabel?: string;
  regionId?: string;
  resourceLabel?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldDataProvisionButton],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-provision-button');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
    getAuthToken: jest.fn(() => '1234'),
    wait: () => 10,
    setAuthToken: jest.fn(),
  });
  component.ownerId = props.ownerId;
  component.planId = props.planId || 'plan-id';
  component.productId = props.productId;
  component.productLabel = props.productLabel;
  component.regionId = props.regionId || 'region-id';
  component.resourceLabel = props.resourceLabel;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-data-provision-button>', () => {
  beforeEach(async () => {
    fetchMock.mock(graphqlEndpoint, (_, req) => {
      const body = (req.body && req.body.toString()) || '';
      const { variables } = JSON.parse(body);
      const errors: GraphqlError[] = [{ message: 'something went wrong' }];
      if (body.includes('mutation CREATE_RESOURCE')) {
        // return new label in response
        const newResource = {
          ...resource,
          label: variables.resourceLabel || resource.label,
        };
        return body.includes('error') ? { data: null, errors } : { data: { data: newResource } };
      }
      if (body.includes('query PROFILE_ID')) {
        return body.includes('error') ? { data: null, errors } : { data: profile };
      }
      if (body.includes('query GET_PRODUCT_ID')) {
        return body.includes('error') ? { data: null, errors } : { data: product };
      }
      if (body.includes('query PLAN_REGIONS')) {
        return body.includes('error') ? { data: null, errors } : { data: plan };
      }
      return { data: null, errors };
    });
  });

  afterEach(() => fetchMock.restore());

  describe('v0 API', () => {
    it('[owner-id]: fetches if missing', async () => {
      await setup({ productLabel: 'my-product' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });

    it('[owner-id]: doesn’t fetch if set', async () => {
      const { page } = await setup({ ownerId: '5678', productId: 'product-id' });
      const provisionButton =
        page.root && page.root.querySelector('manifold-data-provision-button');
      if (!provisionButton) {
        throw new Error('provision button not found');
      }

      expect(fetchMock.called(graphqlEndpoint)).toBe(false);
      expect(provisionButton.ownerId).toEqual('5678');
    });

    it('[product-label]: fetches product by label', async () => {
      const { page } = await setup({ ownerId: 'owner-id', productLabel: 'test-product' });

      const provisionButton =
        page.root && page.root.querySelector('manifold-data-provision-button');
      if (!provisionButton) {
        throw new Error('provision button not found');
      }
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });

    it('[product-label]: doesn’t fetch if missing', async () => {
      await setup({ ownerId: 'owner-id' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(false);
    });

    describe('events', () => {
      it('click', async () => {
        const planId = 'plan-id';
        const productLabel = 'click-product';
        const resourceLabel = 'click-resource';

        const mockClick = jest.fn();

        const { page } = await setup({
          ownerId: 'owner-id',
          planId,
          productLabel,
          resourceLabel,
        });

        const button = page.root && page.root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

        // listen for event and fire
        page.doc.addEventListener('manifold-provisionButton-click', mockClick);
        button.click();

        expect(mockClick).toBeCalledWith(
          expect.objectContaining({
            detail: {
              planId,
              productLabel,
              resourceLabel,
            },
          })
        );
      });

      it('click with no resource label', async () => {
        const planId = 'plan-id';
        const productLabel = 'click-product';

        const mockClick = jest.fn();

        const { page } = await setup({ ownerId: 'owner-id', productLabel });
        const button = page.root && page.root.querySelector('button');
        if (!button) {
          throw new Error('button not found in document');
        }

        // listen for event and fire
        page.doc.addEventListener('manifold-provisionButton-click', mockClick);
        button.click();

        expect(mockClick).toBeCalledWith(
          expect.objectContaining({
            detail: {
              planId,
              productLabel,
            },
          })
        );
      });

      it('invalid: too short', async () => {
        const planId = 'plan-id';
        const productLabel = 'click-product';
        const resourceLabel = 'x';

        const mockClick = jest.fn();

        const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });
        const button = page.root && page.root.querySelector('button');
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
              planId,
              productLabel,
              resourceLabel,
            },
          })
        );
      });

      it('invalid: bad characters', async () => {
        const planId = 'plan-id';
        const resourceLabel = '🦞🦞🦞';
        const productLabel = 'click-product';

        const mockClick = jest.fn();

        const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });
        const button = page.root && page.root.querySelector('button');
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
              planId,
              productLabel,
              resourceLabel,
            },
          })
        );
      });

      it('error', async () => {
        const planId = 'plan-id';
        const resourceLabel = 'error-resource';
        const productLabel = 'product-label';

        const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });
        const button = page.root && page.root.querySelector('button');
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
              message: 'something went wrong',
              planId,
              productLabel,
              resourceLabel,
            },
          })
        );
      });

      it('success', async () => {
        const planId = 'plan-id';
        const resourceLabel = 'success-resource';
        const productLabel = 'success-product';

        const { page } = await setup({ ownerId: 'owner-id', productLabel, resourceLabel });
        const button = page.root && page.root.querySelector('button');
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
              message: `${resourceLabel} successfully provisioned`,
              planId,
              productLabel,
              resourceId: resource.id,
              resourceLabel,
            },
          })
        );
      });

      it('success without resource label', async () => {
        const planId = 'plan-id';
        const productLabel = 'success-product';

        const { page } = await setup({ ownerId: 'owner-id', productLabel });
        const button = page.root && page.root.querySelector('button');
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
              message: `${resource.label} successfully provisioned`,
              planId,
              productLabel,
              resourceId: resource.id,
              resourceLabel: resource.label,
            },
          })
        );
      });
    });
  });
});
