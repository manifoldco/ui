import { ManifoldPlanSelector } from './manifold-plan-selector';

describe('manifold-plan-selector', () => {
  it('fetches product if product label given', () => {
    const productLabel = 'test-label';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchProductByLabel = jest.fn();
    planSelector.productLabel = productLabel;
    planSelector.componentWillLoad();
    expect(planSelector.fetchProductByLabel).toHaveBeenCalledWith(productLabel);
  });

  it('fetches resource if resource name given', () => {
    const resourceName = 'my-resource';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchResource = jest.fn();
    planSelector.resourceName = resourceName;
    planSelector.componentWillLoad();
    expect(planSelector.fetchResource).toHaveBeenCalledWith(resourceName);
  });
});
