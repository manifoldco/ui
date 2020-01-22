import { newSpecPage } from '@stencil/core/testing';
import { ManifoldPlanDetails } from './manifold-plan-details';
import { ManifoldSelect } from '../manifold-select/manifold-select';
import freePlan from '../../spec/mock/prefab/plan-free';
import product from '../../spec/mock/aiven-cassandra/product';
import paidPlan from '../../spec/mock/aiven-cassandra/plan-paid';

interface Props {
  loadCallback?: jest.Mock;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldPlanDetails, ManifoldSelect],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-plan-details');

  // add load event listener for later
  if (props.loadCallback) {
    page.doc.addEventListener('manifold-planSelector-load', props.loadCallback);
  }

  component.plan = paidPlan;
  component.product = product;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-plan-details>', () => {
  describe('v0 events', () => {
    it('load', async () => {
      // set up listener
      const loadCallback = jest.fn();
      await setup({ loadCallback });
      const region = paidPlan.regions && paidPlan.regions.edges[0].node;
      expect(loadCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            planId: paidPlan.id,
            planLabel: paidPlan.label,
            planName: paidPlan.displayName,
            productId: product.id,
            productLabel: product.label,
            regionId: region && region.id,
            regionName: region && region.displayName,
            freePlan: paidPlan.free,
            configuredFeatures: {},
          },
        })
      );
    });

    it('change', async () => {
      const { page, component } = await setup({});

      // set up listener
      const changeCallback = jest.fn();
      page.doc.addEventListener('manifold-planSelector-change', changeCallback);

      // change plan
      component.plan = freePlan;
      await page.waitForChanges();

      const region = freePlan.regions && freePlan.regions.edges[0].node;

      expect(changeCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            planId: freePlan.id,
            planLabel: freePlan.label,
            planName: freePlan.displayName,
            productId: product.id,
            productLabel: product.label,
            regionId: region && region.id,
            regionName: region && region.displayName,
            freePlan: freePlan.free,
            configuredFeatures: {},
          },
        })
      );
    });
  });
});
