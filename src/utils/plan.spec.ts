import {
  ExpandedPlan,
  StringFeatureStatic,
  NumberFeatureStatic,
  BooleanFeatureStaticFalse,
  BooleanFeatureStaticTrue,
  NumberFeatureMeasurableValueFree,
  NumberFeatureMeasurableValuePaid,
  NumberFeatureMeasurableValueUnavailable,
  NumberFeatureMeasurableValueTiered,
  NumberFeatureMeasurable,
  StringFeatureCustom,
  BooleanFeatureCustom,
} from '../spec/mock/catalog';
import { Catalog } from '../types/catalog';
import {
  booleanFeatureDefaultValue,
  booleanFeatureDisplayValue,
  featureCost,
  featureDescription,
  hasCustomizableFeatures,
  hasMeasurableFeatures,
  initialFeatures,
  numberFeatureDefaultValue,
  numberFeatureDisplayValue,
  numberFeatureMeasurableDisplayValue,
  oneCent,
  pricingTiers,
  stringFeatureDefaultValue,
  stringFeatureDisplayValue,
  planSort,
} from './plan';

describe('default value methods', () => {
  it('string features return default value', () =>
    expect(stringFeatureDefaultValue(StringFeatureStatic.value)).toBe('us-east-1'));
  it('number features return default value', () =>
    expect(numberFeatureDefaultValue(NumberFeatureStatic.value)).toBe(5));
  it('boolean features return true when default is true', () =>
    expect(booleanFeatureDefaultValue(BooleanFeatureStaticTrue.value)).toBe(true));
  it('boolean features return true when default is false', () =>
    expect(booleanFeatureDefaultValue(BooleanFeatureStaticFalse.value)).toBe(false));
  it('initial features return map of all default values', () =>
    expect(initialFeatures(ExpandedPlan.body.expanded_features)).toEqual({
      redundancy: false,
      region: 'us-east-1',
      storage: 5,
    }));
});

describe('display value methods', () => {
  it('string features return value name', () =>
    expect(stringFeatureDisplayValue(StringFeatureStatic.value)).toBe('US East 1'));
  it('non-measurable number features return value name', () =>
    expect(numberFeatureDisplayValue(NumberFeatureStatic.value)).toBe('5 GB'));
  it('measurable number features return “free” when always free', () =>
    expect(numberFeatureMeasurableDisplayValue(NumberFeatureMeasurableValueFree)).toBe('Free'));
  it('measurable number features return unavailable when unavailable', () =>
    expect(numberFeatureMeasurableDisplayValue(NumberFeatureMeasurableValueUnavailable)).toContain(
      'No'
    ));
  it('measurable number features return cost when flat cost', () =>
    expect(numberFeatureMeasurableDisplayValue(NumberFeatureMeasurableValuePaid)).toContain('$'));
  it('measurable number features return undefined when pricing tiers', () =>
    expect(numberFeatureMeasurableDisplayValue(NumberFeatureMeasurableValueTiered)).toBe(
      undefined
    ));
  it('boolean features return “Yes” when true', () =>
    expect(booleanFeatureDisplayValue(BooleanFeatureStaticTrue.value)).toBe('Yes'));
  it('boolean features return “No when false', () =>
    expect(booleanFeatureDisplayValue(BooleanFeatureStaticFalse.value)).toBe('No'));
});

describe('cost utilities', () => {
  it('featureCost returns correct value in cents', () => {
    // Get your pad & paper out! This should be 1/10 millionth of a cent
    const price = 200000000;
    const ten = 10;
    const million = 1000000;
    expect(featureCost(price)).toBe(price / ten / million);
  });

  it('oneCent returns the number of features it takes to equal $0.01', () => {
    const price = 5000;
    const ten = 10;
    const million = 1000000;
    expect(oneCent(price)).toBe(Math.ceil((ten * million) / price));
  });

  it('sorts & returns pricing tiers for complex measured features', () =>
    expect(pricingTiers(NumberFeatureMeasurableValueTiered)).toEqual([
      { cost: 0, from: 0, per: 1, suffix: 'hour', to: 10 },
      { cost: 900000000, from: 11, per: 1, suffix: 'hour', to: 100 },
      { cost: 600000000, from: 101, per: 1, suffix: 'hour', to: 200 },
      { cost: 500000000, from: 201, per: 1, suffix: 'hour', to: 300 },
      { cost: 300000000, from: 301, per: 1, suffix: 'hour', to: 400 },
      { cost: 250000000, from: 401, per: 1, suffix: 'hour', to: Infinity },
    ]));

  it('pricingTiers converts seconds for display', () => {
    const ziggeo = {
      label: 'pro-seconds',
      name: 'Pro Seconds',
      numeric_details: {
        cost_ranges: [{ limit: 210000 }, { cost_multiple: 200000, limit: -1 }],
        increment: 1,
        suffix: 'Seconds',
      },
    };

    expect(pricingTiers(ziggeo)).toEqual([
      { cost: 0, from: 0, per: 1, suffix: 'hour', to: 58 },
      { cost: 720000000, from: 58, per: 1, suffix: 'hour', to: Infinity },
    ]);
  });
});

describe('other plan methods', () => {
  it('hasCustomizableFeatures returns false when no custom features present', () =>
    expect(
      hasCustomizableFeatures([StringFeatureStatic, NumberFeatureStatic, NumberFeatureMeasurable])
    ).toBe(false));
  it('hasCustomizableFeatures returns true when custom features present', () =>
    expect(
      hasCustomizableFeatures([StringFeatureStatic, NumberFeatureStatic, StringFeatureCustom])
    ).toBe(true));
  it('hasMeasurableFeatures returns false when no measurable features present', () =>
    expect(
      hasMeasurableFeatures([StringFeatureStatic, NumberFeatureStatic, BooleanFeatureCustom])
    ).toBe(false));
  it('hasMeasurableFeatures returns true when measurable features present', () =>
    expect(
      hasMeasurableFeatures([StringFeatureStatic, NumberFeatureStatic, NumberFeatureMeasurable])
    ).toBe(true));
  it('features return price descriptions when present', () =>
    expect(featureDescription(NumberFeatureStatic.value)).toBe('Free'));
});

describe('plan sort function', () => {
  const freePlan = { body: { cost: 0, free: true } } as Catalog.ExpandedPlan;
  const fauxFreePlan = { body: { cost: 0, free: false } } as Catalog.ExpandedPlan;
  const cheapPlan = { body: { cost: 50, defaultCost: 50, free: false } } as Catalog.ExpandedPlan;
  const highDefaultCost = {
    body: { defaultCost: 100, cost: 0, free: false },
  } as Catalog.ExpandedPlan;
  const expensivePlan = {
    body: { defaultCost: 1000, cost: 1000, free: false },
  } as Catalog.ExpandedPlan;

  const wrongOrder = [highDefaultCost, fauxFreePlan, expensivePlan, cheapPlan, freePlan];
  const rightOrder = [freePlan, fauxFreePlan, cheapPlan, highDefaultCost, expensivePlan];

  it('sorts plans correctly', () => {
    expect(planSort(wrongOrder)).toEqual(rightOrder);
  });

  it('sort() doesn’t reorder original reference', () => {
    const clone = [...wrongOrder];
    planSort(clone);
    expect(clone).toEqual(wrongOrder);
  });
});
