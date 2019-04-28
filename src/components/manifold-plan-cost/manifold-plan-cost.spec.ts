import { ManifoldPlanCost } from './manifold-plan-cost';
import {
  NumberFeatureCustom,
  NumberFeatureMeasurable,
  NumberFeatureStatic,
  NumberFeatureMeasurableValueTiered,
} from '../../spec/mock/catalog';

const measuredFree = {
  ...NumberFeatureMeasurable,
  value: {
    ...NumberFeatureMeasurable.value,
    numeric_details: {
      ...NumberFeatureMeasurable.value.numeric_details,
      cost_ranges: [],
    },
  },
};

const measuredPaid = {
  ...NumberFeatureMeasurable,
  value: NumberFeatureMeasurableValueTiered,
};

describe('<manifold-plan-cost>', () => {
  it('measuredFeatures filters out non-measurable features', () => {
    const planCost = new ManifoldPlanCost();

    expect(
      planCost.measuredFeatures([NumberFeatureCustom, measuredPaid, NumberFeatureStatic])
    ).toEqual([measuredPaid]);
  });

  it('measuredFeatures only returns paid features', () => {
    const planCost = new ManifoldPlanCost();

    expect(planCost.measuredFeatures([measuredFree, measuredPaid])).toEqual([measuredPaid]);
  });
});
