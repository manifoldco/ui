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
  plan.plans = fromJSON(product); // pass the wrong data model here to throw an error
  plan.product = fromJSON(product);

  document.body.appendChild(plan);

  return plan.componentOnReady();
};
