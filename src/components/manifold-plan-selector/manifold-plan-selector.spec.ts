import { ManifoldPlanSelector } from './manifold-plan-selector';

describe('<manifold-plan-selector>', () => {
  it('fetches product by label on load, if given', () => {
    const productLabel = 'test-label';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchProductByLabel = jest.fn();
    planSelector.productLabel = productLabel;
    planSelector.componentWillLoad();
    expect(planSelector.fetchProductByLabel).toHaveBeenCalledWith(productLabel);
  });

  it('fetches new product by label on change, if given', () => {
    const newProduct = 'new-product';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchProductByLabel = jest.fn();
    planSelector.productLabel = 'old-product';
    planSelector.productChange(newProduct);
    expect(planSelector.fetchProductByLabel).toHaveBeenCalledWith(newProduct);
  });

  it('fetches resource on load by resource name, if given', () => {
    const resourceLabel = 'my-resource';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchResource = jest.fn();
    planSelector.resourceLabel = resourceLabel;
    planSelector.componentWillLoad();
    expect(planSelector.fetchResource).toHaveBeenCalledWith(resourceLabel);
  });

  it('fetches resource on change by resource name, if given', () => {
    const newResource = 'new-resource';

    const planSelector = new ManifoldPlanSelector();
    planSelector.fetchResource = jest.fn();
    planSelector.resourceLabel = 'old-resource';
    planSelector.resourceChange(newResource);
    expect(planSelector.fetchResource).toHaveBeenCalledWith(newResource);
  });
});
