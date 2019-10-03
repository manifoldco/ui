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
  convertPlanData,
} from './plan';
import { Plan } from '../types/graphql';

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
  const customizableCheapPlan = {
    body: { defaultCost: 5, cost: 5, customizable: true },
  } as Catalog.ExpandedPlan;
  const customizableExpensivePlan = {
    body: { defaultCost: 1000, cost: 1000, customizable: true },
  } as Catalog.ExpandedPlan;

  const wrongOrder = [
    highDefaultCost,
    fauxFreePlan, // faux free plan before actual free plan
    customizableExpensivePlan, // expensive custom plan first
    customizableCheapPlan,
    expensivePlan, // expensive plan before cheap plan
    cheapPlan,
    freePlan,
  ];
  const rightOrder = [
    freePlan,
    fauxFreePlan,
    cheapPlan,
    highDefaultCost,
    expensivePlan,
    customizableCheapPlan, // at the end custom plans should sort by cost
    customizableExpensivePlan,
  ];

  it('sorts plans correctly', () => {
    expect(planSort(wrongOrder)).toEqual(rightOrder);
  });

  it('doesn’t reorder original reference', () => {
    const clone = [...wrongOrder];
    planSort(clone);
    expect(clone).toEqual(wrongOrder);
  });

  it('filters to free-only plans', () => {
    expect(planSort(rightOrder, { free: true })).toEqual([freePlan, fauxFreePlan]);
  });
});

const graphqlPlan = {
  id: '2352cvkk4f3rp17pbgbrmffe1jcw8',
  displayName: 'Standard',
  label: 'standard',
  product: {
    id: '234htwpkzvg1vuyez6uybfhv8rjb2',
    provider: {
      id: '2343d7p36xwrydjy7120jxqxc7t22',
    },
  },
  cost: 700,
  free: false,
  state: 'AVAILABLE',
  regions: {
    edges: [
      {
        node: {
          id: '235n4f9pxf8eyraj3y159x89z6jer',
          displayName: 'All Regions',
          platform: 'all',
          dataCenter: 'global',
        },
      },
    ],
  },
  fixedFeatures: {
    edges: [
      {
        node: {
          id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
          label: 'static-single-tenant',
          displayName: 'Single Tenant',
          displayValue: 'true',
        },
      },
      {
        node: {
          id: 'edu62vk4c5t68qv2c5q68xv9chu6g',
          label: 'bandwidth',
          displayName: 'Bandwidth',
          displayValue: 'Unlimited',
        },
      },
      {
        node: {
          id: 'edu62vk4c5t68qv6e9jpabb8dxuq4',
          label: 'free-hours',
          displayName: 'Free Hours',
          displayValue: '2',
        },
      },
      {
        node: {
          id: 'edu62vk4c5t68qv6e9jpabb9dngpe',
          label: 'free-imagga-images',
          displayName: 'Free Imagga Images',
          displayValue: '100',
        },
      },
    ],
  },
  meteredFeatures: {
    edges: [
      {
        node: {
          id: 'edu62vk4c5t68qv9dngpetv15nmpu',
          label: 'imagga-images',
          displayName: 'Imagga Images',
          numericDetails: {
            unit: 'image',
            costTiers: [],
          },
        },
      },
      {
        node: {
          id: 'edu62vk4c5t68qvge9qp6tbkedmpw',
          label: 'processing-duration',
          displayName: 'Processing Duration',
          numericDetails: {
            unit: 'hour',
            costTiers: [
              {
                limit: -1,
                cost: 790000000,
              },
            ],
          },
        },
      },
      {
        node: {
          id: 'edu62vk4c5t68qvpd5j6avtdcnq66',
          label: 'video-encoding',
          displayName: 'Video Encoding',
          numericDetails: {
            unit: 'minute',
            costTiers: [
              {
                limit: -1,
                cost: 38900000,
              },
            ],
          },
        },
      },
    ],
  },
  configurableFeatures: {
    edges: [],
  },
};

const restPlan: Catalog.ExpandedPlan = {
  body: {
    cost: 700,
    features: [
      { feature: 'static-single-tenant', value: 'true' },
      { feature: 'bandwidth', value: 'unlimited' },
      { feature: 'free-hours', value: 'two' },
      { feature: 'free-imagga-images', value: 'one-hundred' },
      { feature: 'imagga-images', value: 'no-overage' },
      { feature: 'processing-duration', value: 'processing-hours' },
      { feature: 'video-encoding', value: 'video-encoding' },
    ],
    label: 'standard',
    name: 'Standard',
    product_id: '234htwpkzvg1vuyez6uybfhv8rjb2',
    provider_id: '2343d7p36xwrydjy7120jxqxc7t22',
    regions: ['235n4f9pxf8eyraj3y159x89z6jer'],
    // Not in GraphQL API
    // resizable_to: null,
    state: 'available',
    // Not in GraphQL API
    // trial_days: 0,
    // defaultCost: 700,
    expanded_features: [
      {
        label: 'static-single-tenant',
        name: 'Single Tenant',
        type: 'boolean',
        value: { label: 'true', name: 'true' },
        value_string: 'true',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
      },
      {
        label: 'bandwidth',
        name: 'Bandwidth',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'unlimited', name: 'Unlimited' }],
        value: { label: 'unlimited', name: 'Unlimited' },
        value_string: 'Unlimited',
      },
      {
        label: 'free-hours',
        name: 'Free Hours',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'two', name: '2' }],
        value: { label: 'two', name: '2' },
        value_string: '2',
      },
      {
        label: 'free-imagga-images',
        name: 'Free Imagga Images',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'one-hundred', name: '100' }],
        value: { label: 'one-hundred', name: '100' },
        value_string: '100',
      },
      {
        label: 'imagga-images',
        measurable: true,
        name: 'Imagga Images',
        type: 'number',
        // Not in GraphQL API for fixed/metered features
        // values: [
        //   {
        //     label: 'no-overage',
        //     name: 'No Overage',
        //     numeric_details: { cost_ranges: [], suffix: 'image' },
        //   },
        //   {
        //     label: 'imagga-images',
        //     name: 'Imagga Images',
        //     numeric_details: {
        //       cost_ranges: [{ cost_multiple: 10000000, limit: -1 }],
        //       increment: 1,
        //       suffix: 'image',
        //     },
        //   },
        // ],
        value: {
          label: 'no-overage',
          name: 'No Overage',
          numeric_details: { cost_ranges: [], suffix: 'image' },
        },
        value_string: 'No Overage',
      },
      {
        label: 'processing-duration',
        measurable: true,
        name: 'Processing Duration',
        type: 'number',
        // Not in GraphQL API for fixed/metered features
        // values: [
        //   {
        //     label: 'no-overtime',
        //     name: 'No Overtime',
        //     numeric_details: { cost_ranges: [], suffix: 'hour' },
        //   },
        //   {
        //     label: 'processing-hours',
        //     name: 'Processing Hours',
        //     numeric_details: {
        //       cost_ranges: [{ cost_multiple: 790000000, limit: -1 }],
        //       increment: 1,
        //       suffix: 'hour',
        //     },
        //   },
        // ],
        value: {
          label: 'processing-hours',
          name: 'Processing Hours',
          numeric_details: {
            cost_ranges: [{ cost_multiple: 790000000, limit: -1 }],
            increment: 1,
            suffix: 'hour',
          },
        },
        value_string: 'Processing Hours',
      },
      {
        label: 'video-encoding',
        measurable: true,
        name: 'Video Encoding',
        type: 'number',
        // Not in GraphQL API for fixed features
        // values: [
        //   {
        //     label: 'no-overage',
        //     name: 'No Overage',
        //     numeric_details: { cost_ranges: [], suffix: 'minute' },
        //   },
        //   {
        //     label: 'video-encoding',
        //     name: 'Video Encoding',
        //     numeric_details: {
        //       cost_ranges: [{ cost_multiple: 38900000, limit: -1 }],
        //       increment: 1,
        //       suffix: 'minute',
        //     },
        //   },
        // ],
        value: {
          label: 'video-encoding',
          name: 'Video Encoding',
          numeric_details: {
            cost_ranges: [{ cost_multiple: 38900000, limit: -1 }],
            increment: 1,
            suffix: 'minute',
          },
        },
        value_string: 'Video Encoding',
      },
    ],
    free: false,
  },
  id: '2352cvkk4f3rp17pbgbrmffe1jcw8',
  type: 'plan',
  version: 1,
};

describe('convertPlanData', () => {
  it('converts a plan from GraphQL to REST', () => {
    const result = convertPlanData(graphqlPlan as any);
    expect(result).toEqual(restPlan);
  });
});
