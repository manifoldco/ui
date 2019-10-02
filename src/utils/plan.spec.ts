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
  id: '235exy25wvzpxj52p87bh87gbnj4y',
  displayName: 'Custom',
  label: 'custom',
  product: {
    id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
    provider: {
      id: '2346mdxcuca9ez2n93f72nb2fpjgu',
    },
  },
  cost: 3300,
  free: false,
  state: 'AVAILABLE',
  regions: {
    edges: [
      {
        node: {
          id: '235m2c51y0625vvtk6ptf55bhpkty',
          displayName: 'AWS - EU West 1 (Ireland)',
          platform: 'aws',
          dataCenter: 'eu-west-1',
        },
      },
      {
        node: {
          id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
          displayName: 'AWS - US East 1 (N. Virginia)',
          platform: 'aws',
          dataCenter: 'us-east-1',
        },
      },
    ],
  },
  fixedFeatures: {
    edges: [
      {
        node: {
          id: 'cduq6x3fdnfq6x31ehmp6bbkd5q6e',
          label: 'static-single-tenant',
          displayName: 'Single Tenant',
          displayValue: 'true',
        },
      },
    ],
  },
  meteredFeatures: {
    edges: [],
  },
  configurableFeatures: {
    edges: [
      {
        node: {
          id: 'cduq6x3fdnfp4rb3dduq0wr000000',
          label: 'backups',
          displayName: 'Backups',
          type: 'NUMBER',
          options: [
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: 'Backups',
              displayValue: 'backups',
            },
          ],
          numericDetails: {
            increment: 1,
            min: 0,
            max: 35,
            unit: 'Days',
            costTiers: [
              {
                limit: 35,
                cost: 0,
              },
            ],
          },
        },
      },
      {
        node: {
          id: 'cduq6x3fdnfpjvkkehgpwrv5bxhpr',
          label: 'instance_class',
          displayName: 'RAM',
          type: 'STRING',
          options: [
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '1 GB',
              displayValue: 'db.t2.micro',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '2 GB',
              displayValue: 'db.t2.small',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '4 GB',
              displayValue: 'db.m3.medium',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '8 GB',
              displayValue: 'db.m4.large',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '15 GB',
              displayValue: 'db.r4.large',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '31 GB',
              displayValue: 'db.r4.xlarge',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '61 GB',
              displayValue: 'db.r4.2xlarge',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '122 GB',
              displayValue: 'db.r4.4xlarge',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '244 GB',
              displayValue: 'db.r4.8xlarge',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: '488 GB',
              displayValue: 'db.r4.16xlarge',
            },
          ],
          numericDetails: null,
        },
      },
      {
        node: {
          id: 'cduq6x3fdnfq4tb4enq68rbecdwg0',
          label: 'redundancy',
          displayName: 'High Availability',
          type: 'BOOLEAN',
          options: [
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: 'Yes',
              displayValue: 'true',
            },
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: 'No',
              displayValue: 'false',
            },
          ],
          numericDetails: null,
        },
      },
      {
        node: {
          id: 'cduq6x3fdnfq6x3fe9gpet8000000',
          label: 'storage',
          displayName: 'Storage',
          type: 'NUMBER',
          options: [
            {
              id: '00000000000000000000000000000',
              label: '',
              displayName: 'Storage',
              displayValue: 'storage',
            },
          ],
          numericDetails: {
            increment: 1,
            min: 0,
            max: 16000,
            unit: 'GB',
            costTiers: [
              {
                limit: 16000,
                cost: 200000000,
              },
            ],
          },
        },
      },
    ],
  },
};

const restPlan = [
  {
    body: {
      cost: 3300,
      features: [
        { feature: 'storage', value: 'storage' },
        { feature: 'backups', value: 'backups' },
        { feature: 'redundancy', value: 'false' },
        { feature: 'instance_class', value: 'db.t2.micro' },
        { feature: 'static-single-tenant', value: 'true' },
      ],
      label: 'custom',
      name: 'Custom',
      product_id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
      provider_id: '2346mdxcuca9ez2n93f72nb2fpjgu',
      regions: ['235mhkk15ky7ha9qpu4gazrqjt2gr', '235m2c51y0625vvtk6ptf55bhpkty'],
      resizable_to: ['235exy25wvzpxj52p87bh87gbnj4y'],
      state: 'available',
      customizable: true,
      defaultCost: 3500,
      expanded_features: [
        {
          label: 'static-single-tenant',
          name: 'Single Tenant',
          type: 'boolean',
          values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
          value: { label: 'true', name: 'true' },
          value_string: 'true',
        },
        {
          customizable: true,
          downgradable: true,
          label: 'instance_class',
          name: 'RAM',
          type: 'string',
          upgradable: true,
          values: [
            { label: 'db.t2.micro', name: '1 GB', price: {} },
            { cost: 5400, label: 'db.t2.small', name: '2 GB', price: { cost: 5400 } },
            { cost: 13400, label: 'db.m3.medium', name: '4 GB', price: { cost: 13400 } },
            { cost: 31800, label: 'db.m4.large', name: '8 GB', price: { cost: 31800 } },
            { cost: 54400, label: 'db.r4.large', name: '15 GB', price: { cost: 54400 } },
            { cost: 89000, label: 'db.r4.xlarge', name: '31 GB', price: { cost: 89000 } },
            { cost: 121000, label: 'db.r4.2xlarge', name: '61 GB', price: { cost: 121000 } },
            { cost: 239000, label: 'db.r4.4xlarge', name: '122 GB', price: { cost: 239000 } },
            { cost: 428000, label: 'db.r4.8xlarge', name: '244 GB', price: { cost: 428000 } },
            { cost: 910000, label: 'db.r4.16xlarge', name: '488 GB', price: { cost: 910000 } },
          ],
          value: { label: 'db.t2.micro', name: '1 GB', price: {} },
          value_string: '1 GB',
        },
        {
          customizable: true,
          label: 'storage',
          name: 'Storage',
          type: 'number',
          upgradable: true,
          values: [
            {
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
          ],
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
          value_string: 'Storage',
        },
        {
          customizable: true,
          downgradable: true,
          label: 'backups',
          name: 'Backups',
          type: 'number',
          upgradable: true,
          values: [
            {
              label: 'backups',
              name: 'Backups',
              numeric_details: {
                cost_ranges: [{ limit: 35 }],
                increment: 1,
                max: 35,
                min: 1,
                suffix: 'Days',
              },
              price: {
                description: 'Backups cost is directly related to storage size',
                formula: '(* storage#cost backups#number)',
              },
            },
          ],
          value: {
            label: 'backups',
            name: 'Backups',
            numeric_details: {
              cost_ranges: [{ limit: 35 }],
              increment: 1,
              max: 35,
              min: 1,
              suffix: 'Days',
            },
            price: {
              description: 'Backups cost is directly related to storage size',
              formula: '(* storage#cost backups#number)',
            },
          },
          value_string: 'Backups',
        },
        {
          customizable: true,
          downgradable: true,
          label: 'redundancy',
          name: 'High Availability',
          type: 'boolean',
          upgradable: true,
          values: [
            {
              label: 'true',
              name: 'Yes',
              price: {
                description: 'Creates a clone of the DB to rescue from potential outages',
                formula: '(* plan#partial_cost redundancy#multiply_factor)',
                multiply_factor: 0.8,
              },
            },
            { label: 'false', name: 'No' },
          ],
          value: { label: 'false', name: 'No' },
          value_string: 'No',
        },
      ],
      free: false,
    },
    id: '235exy25wvzpxj52p87bh87gbnj4y',
    type: 'plan',
    version: 1,
  },
];

describe('convertPlanData', () => {
  it('converts a plan from GraphQL to REST', () => {
    const result = convertPlanData(graphqlPlan as any);
    expect(result).toEqual(restPlan);
  });
});
