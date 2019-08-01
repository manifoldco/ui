import { ManifoldPlan } from './manifold-plan';

describe('<manifold-plan>', () => {
  it('fetches product and plan by label on load, if given', () => {
    const productLabel = 'test-label';
    const planLabel = 'test-plan-label';

    const planSelector = new ManifoldPlan();
    planSelector.fetchProductAndPlan = jest.fn();
    planSelector.productLabel = productLabel;
    planSelector.planLabel = planLabel;
    planSelector.componentDidLoad();
    expect(planSelector.fetchProductAndPlan).toHaveBeenCalledWith(productLabel, planLabel);
  });

  it('refetches product and plan on product label change, if given', () => {
    const newProduct = 'new-product';
    const planLabel = 'test-plan-label';

    const planSelector = new ManifoldPlan();
    planSelector.fetchProductAndPlan = jest.fn();
    planSelector.productLabel = 'old-product';
    planSelector.planLabel = planLabel;
    planSelector.productChange(newProduct);
    expect(planSelector.fetchProductAndPlan).toHaveBeenCalledWith(newProduct, planLabel);
  });

  it('refetches product and plan on plan label change, if given', () => {
    const productLabel = 'test-label';
    const newPlan = 'new-plan';

    const planSelector = new ManifoldPlan();
    planSelector.fetchProductAndPlan = jest.fn();
    planSelector.productLabel = productLabel;
    planSelector.planLabel = 'old-plan';
    planSelector.planChange(newPlan);
    expect(planSelector.fetchProductAndPlan).toHaveBeenCalledWith(productLabel, newPlan);
  });
});
