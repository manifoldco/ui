import { ManifoldPlanDetails as PlanDetails } from './manifold-plan-details';
import { ExpandedPlan, ExpandedPlanCustom, Product } from '../../spec/mock/catalog';

describe(`<manifold-plan-details>`, () => {
  it('initializes all features for fixed plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlan;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({
      region: 'us-east-1',
      redundancy: false,
      storage: 5,
    });
  });

  it('initializes all features for customizable plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({
      instance_class: 'db.t2.micro',
      redundancy: false,
      storage: 5,
    });
  });

  it('dispatches update event when loaded', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;

    const mock = { emit: jest.fn() };
    planDetails.planUpdated = mock;

    planDetails.componentWillLoad();
    expect(mock.emit).toHaveBeenCalledWith({
      features: { instance_class: 'db.t2.micro', redundancy: false, storage: 5 },
      id: '235exy25wvzpxj52p87bh87gbnj4y',
      label: 'custom',
      product: 'jawsdb-mysql',
    });
  });
});
