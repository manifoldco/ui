import { PlanDetails } from './plan-details';
import { ExpandedPlan, ExpandedPlanCustom, Product } from '../../spec/mock/catalog';

describe(`<plan-details>`, () => {
  it('initializes no default features for fixed plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlan;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({});
  });

  it('initializes customizable features for customizable plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({
      backups: 1,
      instance_class: 'db.t2.micro',
      redundancy: false,
      storage: 5,
    });
  });
});
