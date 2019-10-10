import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import {} from '../../types/graphql';
import { ManifoldPlanSelector } from './manifold-plan-selector';
import { ManifoldPlanMenu } from '../manifold-plan-menu/manifold-plan-menu';
import { ManifoldPlanDetails } from '../manifold-plan-details/manifold-plan-details';
import { ManifoldActivePlan } from '../manifold-active-plan/manifold-active-plan';
import { ExpandedPlanCustom } from '../../spec/mock/catalog';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import { product } from '../../spec/mock/graphql';

const graphqlEndpoint = 'http://test.com/graphql';

const mockLoad = jest.fn();

async function setup() {
  const page = await newSpecPage({
    components: [ManifoldPlanSelector, ManifoldActivePlan, ManifoldPlanMenu, ManifoldPlanDetails],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-provision-button');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
  });
  component.productLabel = 'test-product';

  // add load event listener for later
  component.addEventListener('manifold-planSelector-load', mockLoad);

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe(`<manifold-plan-details>`, () => {
  beforeEach(async () => fetchMock.mock(graphqlEndpoint, { data: product }));
  afterEach(() => {
    fetchMock.restore();
    mockLoad.mockReset();
  });

  describe('v0 props', () => {
    it('[product-label]', async () => {
      await setup();
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });
  });

  describe('v0 events', async () => {
    it('load', async () => {
      await setup();
      expect(mockLoad).toHaveBeenCalledWith(expect.objectContaining({ planId: '' }));
    });

    it('change', async () => {
      const { page } = await setup();

      const mockClick = jest.fn();
      const component = page.root && page.root.querySelector('manifold-plan-selector');
      const plans = page.root && page.root.querySelectorAll('[type="radio"]');
      if (!component || !plans) {
        throw new Error('plan selector not in document');
      }
      component.addEventListener('manifold-planSelector-change', mockClick);

      const plan = plans[0];
      (plan as HTMLInputElement).click();
      await page.waitForChanges();
      expect(mockClick).toHaveBeenCalledWith(expect.objectContaining({ planId: '' }));
    });
  });
});
