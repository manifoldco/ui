import { newSpecPage } from '@stencil/core/testing';
import { ManifoldPlanDetails } from './manifold-plan-details';
import { ManifoldSelect } from '../manifold-select/manifold-select';
import freePlan from '../../spec/mock/prefab/plan-free';
import product from '../../spec/mock/aiven-cassandra/product';
import paidPlan from '../../spec/mock/aiven-cassandra/plan-paid';

interface Props {
  loadCallback?: jest.Mock;
  regions?: string[];
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

  component.regions = props.regions;
  component.plan = paidPlan;
  component.product = product;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-plan-details>', () => {
  describe('v0 props', () => {
    it('[regions]', async () => {
      const regions = ['us-west-1', 'us-west-2', 'us-east-2'];
      const { page } = await setup({ regions });
      const planDetails = page.root && page.root.querySelector('manifold-plan-details');
      const select =
        planDetails &&
        planDetails.shadowRoot &&
        planDetails.shadowRoot.querySelector('manifold-select');
      const options = select && select.shadowRoot && select.shadowRoot.querySelectorAll('option');
      if (!options) {
        throw new Error('region select not in document');
      }

      const optionValues: string[] = [];
      options.forEach(option => {
        optionValues.push(`${option.getAttribute('value')}`);
      });
      expect(optionValues).toEqual(regions);
    });
  });

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
          },
        })
      );
    });
  });
});
