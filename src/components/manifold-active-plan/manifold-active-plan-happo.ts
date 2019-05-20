import product from '../../spec/mock/jawsdb/product.json';
import plans from '../../spec/mock/jawsdb/plans.json';
import fromJSON from '../../spec/mock/fromJSON';

export const jawsDB = () => {
  const plan = document.createElement('manifold-active-plan');
  plan.plans = fromJSON(plans);
  plan.product = fromJSON(product);

  document.body.appendChild(plan);
};
