import product from '../../spec/mock/jawsdb/product.json';
import plans from '../../spec/mock/jawsdb/plans.json';
import regions from '../../spec/mock/jawsdb/regions.json';
import fromJSON from '../../spec/mock/fromJSON';

export const jawsDB = async () => {
  const plan = document.createElement('manifold-active-plan');
  plan.plans = fromJSON(plans);
  plan.product = fromJSON(product);

  document.body.appendChild(plan);

  await plan.componentOnReady();

  if (plan.shadowRoot) {
    const details = plan.shadowRoot.querySelector('manifold-plan-details');

    if (details && details.shadowRoot) {
      const selector = details.shadowRoot.querySelector('manifold-region-selector');
      if (selector) {
        selector.regions = fromJSON(regions);
        selector.restFetch = () => Promise.resolve(undefined);

        document.body.appendChild(plan);

        return selector.componentOnReady();
      }
    }
  }

  return plan.componentOnReady();
};

export const planError = async () => {
  const plan = document.createElement('manifold-active-plan');
  plan.plans = fromJSON(plans);
  plan.product = fromJSON(product);

  plan.selectedResource = {
    get region() {
      throw new Error('oops'); // strangely-specific render() error for this component
    },
  } as any;

  document.body.appendChild(plan);

  await plan.componentOnReady();

  if (plan.shadowRoot) {
    const details = plan.shadowRoot.querySelector('manifold-plan-details');

    if (details && details.shadowRoot) {
      const selector = details.shadowRoot.querySelector('manifold-region-selector');
      if (selector) {
        selector.regions = fromJSON(regions);

        document.body.appendChild(plan);

        return selector.componentOnReady();
      }
    }
  }

  return plan.componentOnReady();
};
