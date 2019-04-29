import { ManifoldPlanMenu } from './manifold-plan-menu';
import { ExpandedPlan } from '../../spec/mock/catalog';

describe('<manifold-plan-menu>', () => {
  it('sorts customizable plans to the end', () => {
    const planMenu = new ManifoldPlanMenu();

    const nonCustom = { ...ExpandedPlan, body: { ...ExpandedPlan.body, customizable: undefined } };
    const custom = { ...ExpandedPlan, body: { ...ExpandedPlan.body, customizable: true } };
    expect(planMenu.sortPlans([nonCustom, custom, nonCustom, custom])).toEqual([
      nonCustom,
      nonCustom,
      custom,
      custom,
    ]);
  });
});
