import { newSpecPage } from '@stencil/core/testing';

import { ResourceWithOwnerQuery } from '../../types/graphql';
import resource from '../../spec/mock/elegant-cms/resource';
import { ManifoldResourcePlan } from './manifold-resource-plan';
import { ManifoldPlanDetails } from '../manifold-plan-details/manifold-plan-details';

interface Props {
  gqlData?: ResourceWithOwnerQuery['resource'];
  loading?: boolean;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourcePlan, ManifoldPlanDetails],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-plan');
  component.loading = props.loading;
  component.gqlData = props.gqlData;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();
  return { page, component };
}

describe('<manifold-resource-plan>', () => {
  describe('v0 props', () => {
    it('[gqlData]: renders skeleton if missing', async () => {
      const { page } = await setup({});
      const planDetails = page.root && page.root.querySelector('manifold-plan-details');
      const skeleton =
        planDetails &&
        planDetails.shadowRoot &&
        planDetails.shadowRoot.querySelector('manifold-skeleton-text');
      expect(skeleton).not.toBeNull();
    });

    it('[gqlData]: renders product card', async () => {
      const { page } = await setup({
        loading: false,
        gqlData: resource as ResourceWithOwnerQuery['resource'],
      });
      const planDetails = page.root && page.root.querySelector('manifold-plan-details');
      const productName =
        planDetails &&
        planDetails.shadowRoot &&
        planDetails.shadowRoot.querySelector('[itemprop="brand"]');
      expect((productName as HTMLElement).innerText).toBe(
        resource.plan && resource.plan.product && resource.plan.product.displayName
      );
    });

    it('[loading]: renders skeleton', async () => {
      const { page } = await setup({
        loading: true,
        gqlData: resource as ResourceWithOwnerQuery['resource'],
      });
      const planDetails = page.root && page.root.querySelector('manifold-plan-details');
      const skeleton =
        planDetails &&
        planDetails.shadowRoot &&
        planDetails.shadowRoot.querySelector('manifold-skeleton-text');
      expect(skeleton).not.toBeNull();
    });
  });
});
