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
import { Plan, PlanState, ProductState, PlanFeatureType } from '../types/graphql';

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
      { cost: 0, from: 0, per: 1, unit: 'hour', to: 10 },
      { cost: 900000000, from: 11, per: 1, unit: 'hour', to: 100 },
      { cost: 600000000, from: 101, per: 1, unit: 'hour', to: 200 },
      { cost: 500000000, from: 201, per: 1, unit: 'hour', to: 300 },
      { cost: 300000000, from: 301, per: 1, unit: 'hour', to: 400 },
      { cost: 250000000, from: 401, per: 1, unit: 'hour', to: Infinity },
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
      { cost: 0, from: 0, per: 1, unit: 'hour', to: 58 },
      { cost: 720000000, from: 58, per: 1, unit: 'hour', to: Infinity },
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

const graphqlPlan: Plan = {
  id: '2352cvkk4f3rp17pbgbrmffe1jcw8',
  displayName: 'Standard',
  label: 'standard',
  product: {
    id: '234htwpkzvg1vuyez6uybfhv8rjb2',
    displayName: '',
    label: '',
    logoUrl: '',
    state: ProductState.Available,
    tagline: '',
    supportEmail: '',
    documentationUrl: '',
    termsUrl: '',
    valueProps: [],
    valuePropsHtml: '',
    setupStepsHtml: '',
    categories: [],
    provider: {
      id: '2343d7p36xwrydjy7120jxqxc7t22',
      displayName: '',
      label: '',
      logoUrl: '',
      supportEmail: '',
      url: '',
    },
  },
  cost: 700,
  free: false,
  state: PlanState.Available,
  regions: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: '',
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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: '',
        node: {
          id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
          label: 'static-single-tenant',
          displayName: 'Single Tenant',
          displayValue: 'true',
        },
      },
      {
        cursor: '',
        node: {
          id: 'edu62vk4c5t68qv2c5q68xv9chu6g',
          label: 'bandwidth',
          displayName: 'Bandwidth',
          displayValue: 'Unlimited',
        },
      },
      {
        cursor: '',
        node: {
          id: 'edu62vk4c5t68qv6e9jpabb8dxuq4',
          label: 'free-hours',
          displayName: 'Free Hours',
          displayValue: '2',
        },
      },
      {
        cursor: '',
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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: '',
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
        cursor: '',
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
        cursor: '',
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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: '',
        node: {
          id: '',
          label: 'instance_class',
          displayName: 'RAM',
          type: PlanFeatureType.String,
          options: [
            { id: '', label: 'db.t2.micro', displayName: 'RAM', displayValue: '1 GB' },
            { id: '', label: 'db.t2.small', displayName: 'RAM', displayValue: '2 GB' },
            { id: '', label: 'db.m3.medium', displayName: 'RAM', displayValue: '4 GB' },
            { id: '', label: 'db.m4.large', displayName: 'RAM', displayValue: '8 GB' },
            { id: '', label: 'db.r4.large', displayName: 'RAM', displayValue: '15 GB' },
            { id: '', label: 'db.r4.xlarge', displayName: 'RAM', displayValue: '31 GB' },
            { id: '', label: 'db.r4.2xlarge', displayName: 'RAM', displayValue: '61 GB' },
            { id: '', label: 'db.r4.4xlarge', displayName: 'RAM', displayValue: '122 GB' },
            { id: '', label: 'db.r4.8xlarge', displayName: 'RAM', displayValue: '244 GB' },
            { id: '', label: 'db.r4.16xlarge', displayName: 'RAM', displayValue: '488 GB' },
          ],
        },
      },
      {
        cursor: '',
        node: {
          id: '',
          label: 'storage',
          displayName: 'Storage',
          type: PlanFeatureType.Number,
          numericDetails: {
            costTiers: [{ cost: 200000000, limit: 16000 }],
            increment: 1,
            max: 16000,
            min: 5,
            unit: 'GB',
          },
        },
      },
      {
        cursor: '',
        node: {
          id: '',
          label: 'redundancy',
          displayName: 'High Availability',
          type: PlanFeatureType.Boolean,
          options: [
            { id: '', label: 'false', displayName: 'High Availability', displayValue: 'No' },
            { id: '', label: 'true', displayName: 'High Availability', displayValue: 'Yes' },
          ],
        },
      },
    ],
  },
};

const restPlan: Catalog.ExpandedPlan = {
  body: {
    cost: 700,
    // Features not needed for fixed/metered features
    // features: [
    //   { feature: 'static-single-tenant', value: 'true' },
    //   { feature: 'bandwidth', value: 'unlimited' },
    //   { feature: 'free-hours', value: 'two' },
    //   { feature: 'free-imagga-images', value: 'one-hundred' },
    //   { feature: 'imagga-images', value: 'no-overage' },
    //   { feature: 'processing-duration', value: 'processing-hours' },
    //   { feature: 'video-encoding', value: 'video-encoding' },
    // ],
    features: [
      { feature: 'instance_class', value: 'db.t2.micro' },
      { feature: 'storage', value: '5 GB' },
      { feature: 'redundancy', value: 'false' },
    ],
    label: 'standard',
    name: 'Standard',
    customizable: true,
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
      // NOTE: all value.label values have been changed to match the feature label in order to reflect GraphQL limitations
      {
        label: 'bandwidth',
        name: 'Bandwidth',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'unlimited', name: 'Unlimited' }],
        value: { label: 'bandwidth', name: 'Unlimited' },
        value_string: 'Unlimited',
      },
      {
        label: 'free-hours',
        name: 'Free Hours',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'two', name: '2' }],
        value: { label: 'free-hours', name: '2' },
        value_string: '2',
      },
      {
        label: 'free-imagga-images',
        name: 'Free Imagga Images',
        type: 'string',
        // Not in GraphQL API for fixed/metered features
        // values: [{ label: 'one-hundred', name: '100' }],
        value: { label: 'free-imagga-images', name: '100' },
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
          label: 'imagga-images',
          name: 'Imagga Images',
          numeric_details: { cost_ranges: [], suffix: 'image' },
        },
        value_string: 'Imagga Images',
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
          label: 'processing-duration',
          name: 'Processing Duration',
          numeric_details: {
            cost_ranges: [{ cost_multiple: 790000000, limit: -1 }],
            increment: 1,
            suffix: 'hour',
          },
        },
        value_string: 'Processing Duration',
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
      {
        customizable: true,
        // downgradable: true,
        label: 'instance_class',
        name: 'RAM',
        type: 'string',
        value: { label: 'db.t2.micro', name: '1 GB' },
        values: [
          { label: 'db.t2.micro', name: '1 GB' },
          { label: 'db.t2.small', name: '2 GB' },
          { label: 'db.m3.medium', name: '4 GB' },
          { label: 'db.m4.large', name: '8 GB' },
          { label: 'db.r4.large', name: '15 GB' },
          { label: 'db.r4.xlarge', name: '31 GB' },
          { label: 'db.r4.2xlarge', name: '61 GB' },
          { label: 'db.r4.4xlarge', name: '122 GB' },
          { label: 'db.r4.8xlarge', name: '244 GB' },
          { label: 'db.r4.16xlarge', name: '488 GB' },
        ],
        value_string: '1 GB',
        // upgradable: true,
      },
      {
        customizable: true,
        label: 'storage',
        name: 'Storage',
        type: 'number',
        value: {
          label: 'storage',
          name: 'Storage',
          numeric_details: {
            cost_ranges: [{ cost_multiple: 200000000, limit: 16000 }],
            increment: 1,
            max: 16000,
            min: 5,
            suffix: 'GB',
          },
        },
        values: [],
        value_string: 'Storage',
        // upgradable: true,
      },
      {
        customizable: true,
        // downgradable: true,
        label: 'redundancy',
        name: 'High Availability',
        type: 'boolean',
        // upgradable: true,
        value: {
          label: 'false',
          name: 'No',
        },
        values: [{ label: 'false', name: 'No' }, { label: 'true', name: 'Yes' }],
        value_string: 'No',
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
    const result = convertPlanData(graphqlPlan);
    expect(result).toEqual(restPlan);
  });
});
