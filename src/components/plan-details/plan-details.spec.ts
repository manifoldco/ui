import { PlanDetails } from './plan-details';
import { ExpandedPlan, ExpandedPlanCustom, Product } from '../../spec/mock/catalog';

describe(`<plan-details>`, () => {
  it('initializes all features for fixed plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlan;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({
      'static-connections': 'connections-generated-2',
      'static-high-availability': false,
      'static-ram': 'ram-generated-0',
      'static-rollback': 'rollback-generated-4',
      'static-single-tenant': false,
      'static-storage': 'storage-generated-1',
    });
  });

  it('initializes all features for customizable plans', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;
    expect(planDetails.initialFeatures()).toEqual({
      backups: 1,
      instance_class: 'db.t2.micro',
      redundancy: false,
      'static-single-tenant': true,
      storage: 5,
    });
  });
});
