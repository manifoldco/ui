import { ManifoldPlanDetails as PlanDetails } from './manifold-plan-details';
import { ExpandedPlan, ExpandedPlanCustom, Product } from '../../spec/mock/catalog';

describe(`<manifold-plan-details>`, () => {
  it('initializes all features for fixed plans', () => {
    const planDetails = new PlanDetails();
    expect(planDetails.setFeaturesFromPlan(ExpandedPlan)).toEqual({
      region: 'us-east-1',
      redundancy: false,
      storage: 5,
    });
  });

  it('initializes all features for customizable plans', () => {
    const planDetails = new PlanDetails();
    expect(planDetails.setFeaturesFromPlan(ExpandedPlanCustom)).toEqual({
      instance_class: 'db.t2.micro',
      redundancy: false,
      storage: 5,
    });
  });

  it('initializes features if given resource features', () => {
    const planDetails = new PlanDetails();

    const resourceFeatures: Gateway.ResolvedFeature[] = [
      {
        label: 'sandwich',
        name: 'Choice Sandwich',
        type: 'string',
        value: { displayValue: 'Mint Sandwich', value: 'mint' },
      },
      {
        label: 'juice',
        name: 'Jus Ensache',
        type: 'number',
        value: { displayValue: '1410 Litres', suffix: 'Litres', value: 1410 },
      },
      {
        label: 'crackers',
        name: 'Smashed Crackers',
        type: 'boolean',
        value: { displayValue: 'Yes', value: true },
      },
      {
        label: 'cheese',
        name: 'Cheese',
        type: 'string',
        value: { displayValue: 'Premium Surprise Cheese', value: 'nochoice' },
      },
    ];
    expect(planDetails.setFeaturesFromResource(resourceFeatures)).toEqual({
      sandwich: 'mint',
      juice: 1410,
      crackers: true,
      cheese: 'nochoice',
    });
  });

  it('filters out non-custom features', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;

    expect(
      planDetails.customFeatures({
        non_custom1: 'yes',
        non_custom2: 'yes',
        instance_class: 'db.t2.micro',
        redundancy: false,
        storage: 5,
      })
    ).toEqual({ instance_class: 'db.t2.micro', redundancy: false, storage: 5 });
  });

  it('dispatches update event', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;
    planDetails.planLoad = { emit: jest.fn() };
    planDetails.componentWillLoad(); // Set initial features

    const mock = { emit: jest.fn() };
    planDetails.planUpdate = mock;

    // Set redundancy: true
    const e = new CustomEvent('', { detail: { name: 'redundancy', value: true } });
    planDetails.handleChangeValue(e);
    expect(mock.emit).toHaveBeenCalledWith({
      features: { redundancy: true, instance_class: 'db.t2.micro', storage: 5 },
      planId: '235exy25wvzpxj52p87bh87gbnj4y',
      planLabel: 'custom',
      planName: 'Custom',
      productLabel: 'jawsdb-mysql',
      regionId: '235mhkk15ky7ha9qpu4gazrqjt2gr',
    });
  });
});
