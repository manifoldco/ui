import product from '../../spec/mock/jawsdb/product.json';
import plans from '../../spec/mock/jawsdb/plans.json';
import fromJSON from '../../spec/mock/fromJSON';

export const jawsDB = () => {
  const plan = document.createElement('manifold-active-plan');
  plan.plans = fromJSON(plans);
  plan.product = fromJSON(product);

  document.body.appendChild(plan);

  return plan.componentOnReady();
};

export const planError = () => {
  const plan = document.createElement('manifold-active-plan');
  plan.plans = fromJSON(plans);
  plan.product = fromJSON(product);
  plan.selectedResource = {
    get region() {
      throw new Error('oops'); // strangely-specific render() error for this component
    },
  } as any;

  document.body.appendChild(plan);

  return plan.componentOnReady();
};
