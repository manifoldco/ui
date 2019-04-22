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

  it('dispatches load event', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;

    const mock = { emit: jest.fn() };
    planDetails.planLoad = mock;

    planDetails.componentWillLoad();
    expect(mock.emit).toHaveBeenCalledWith({
      features: { instance_class: 'db.t2.micro', redundancy: false, storage: 5 },
      planId: '235exy25wvzpxj52p87bh87gbnj4y',
      planLabel: 'custom',
      productLabel: 'jawsdb-mysql',
      regionId: '235mhkk15ky7ha9qpu4gazrqjt2gr',
    });
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
      productLabel: 'jawsdb-mysql',
      regionId: '235mhkk15ky7ha9qpu4gazrqjt2gr',
    });
  });

  it('dispatches click event', () => {
    const planDetails = new PlanDetails();
    planDetails.plan = ExpandedPlanCustom;
    planDetails.product = Product;
    planDetails.planLoad = { emit: jest.fn() };
    planDetails.componentWillLoad(); // Set initial features

    const mock = { emit: jest.fn() };
    planDetails.planClick = mock;

    planDetails.onClick(new Event('click'));
    expect(mock.emit).toHaveBeenCalledWith({
      features: { instance_class: 'db.t2.micro', redundancy: false, storage: 5 },
      planId: '235exy25wvzpxj52p87bh87gbnj4y',
      planLabel: 'custom',
      productLabel: 'jawsdb-mysql',
      regionId: '235mhkk15ky7ha9qpu4gazrqjt2gr',
    });
  });
});
