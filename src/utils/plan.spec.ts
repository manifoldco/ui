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
  pricingTiers,
  stringFeatureDefaultValue,
  stringFeatureDisplayValue,
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
  it('measurable number features display range when pricing tiers', () =>
    // Drew: this test is a bit snapshot-y, but still valuable IMO
    expect(numberFeatureMeasurableDisplayValue(NumberFeatureMeasurableValueTiered)).toBe(
      '0–9 hour: free / 10–99 hour: $0.90 / 100–199 hour: $0.60 / 200–299 hour: $0.50 / 300–399 hour: $0.30 / 400+ hour: $0.25'
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

  it('sorts & returns pricing tiers for complex measured features', () =>
    expect(pricingTiers(NumberFeatureMeasurableValueTiered)).toEqual([
      { cost: 0, limit: 10, suffix: 'hour' },
      { cost: 90, limit: 100, suffix: 'hour' },
      { cost: 60, limit: 200, suffix: 'hour' },
      { cost: 50, limit: 300, suffix: 'hour' },
      { cost: 30, limit: 400, suffix: 'hour' },
      { cost: 25, limit: -1, suffix: 'hour' },
    ]));
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
