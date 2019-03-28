// Mock data is static, so we don’t need our null checks
// These shims should only stay within this mock data, and never be exported
interface TExpandedPlan extends Catalog.ExpandedPlan {
  body: TExpandedPlanBody;
}

interface TExpandedPlanBody extends Catalog.ExpandedPlanBody {
  expanded_features: TExpandedFeature[];
}
interface TExpandedFeature extends Catalog.ExpandedFeature {
  values: Catalog.FeatureValueDetails[];
  value: Catalog.FeatureValueDetails;
}

interface TNumberFeature extends Catalog.ExpandedFeature {
  values: TNumberFeatureDetails[];
  value: TNumberFeatureDetails;
}

interface TNumberFeatureDetails extends Catalog.FeatureValueDetails {
  numeric_details: Catalog.FeatureNumericDetails;
}

export const StringFeatureStatic: TExpandedFeature = {
  label: 'region',
  name: 'Region',
  type: 'string',
  values: [
    { label: 'us-east-1', name: 'US East' },
    { label: 'us-west-1', name: 'US West' },
    { label: 'ap-south-1', name: 'Asia Pacific (Mumbai)' },
    { label: 'ca-central-1', name: 'Canada (Central)' },
    { label: 'us-west-1', name: 'EU (Ireland)' },
  ],
  value: { label: 'us-east-1', name: 'US East 1' },
};

export const StringFeatureCustom: TExpandedFeature = {
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
};

export const NumberFeatureStatic: TNumberFeature = {
  label: 'storage',
  name: 'Storage',
  type: 'number',
  values: [
    {
      label: 'storage',
      name: '5 GB',
      numeric_details: {
        cost_ranges: [{ limit: 5 }, { cost_multiple: 200000000, limit: 16000 }],
        increment: 1,
        max: 16000,
        min: 5,
        suffix: 'GB',
      },
      price: {
        description: 'Free',
        formula: '(* storage#cost backups#number)',
      },
    },
  ],
  value: {
    label: 'storage',
    name: '5 GB',
    numeric_details: {
      cost_ranges: [{ limit: 5 }, { cost_multiple: 200000000, limit: 16000 }],
      increment: 1,
      max: 16000,
      min: 5,
      suffix: 'GB',
    },
    price: {
      description: 'Free',
      formula: '(* storage#cost backups#number)',
    },
  },
  value_string: 'Storage',
};

export const NumberFeatureCustom: TNumberFeature = {
  ...NumberFeatureStatic,
  customizable: true,
  upgradable: true,
};

export const NumberFeatureMeasurableValueFree: TNumberFeatureDetails = {
  label: 'trial',
  name: 'Trial GPU',
  numeric_details: { cost_ranges: [{ limit: 10 }], increment: 1, suffix: 'hour' },
};

export const NumberFeatureMeasurableValuePaid: TNumberFeatureDetails = {
  label: 'dual-nvidia-1070ti-500-gb-ssd',
  name: 'Dual NVIDIA 1070ti 500 GB SSD',
  numeric_details: {
    cost_ranges: [{ cost_multiple: 900000000, limit: -1 }],
    increment: 1,
    suffix: 'hour',
  },
};

export const NumberFeatureMeasurableValueUnavailable: TNumberFeatureDetails = {
  label: 'too-expensive-4u',
  name: 'No GPU',
  numeric_details: { increment: 1, suffix: 'hour' },
};

export const NumberFeatureMeasurableValueTiered: TNumberFeatureDetails = {
  label: 'tiered-plan',
  name: 'NVIDIA Tiered PLan',
  numeric_details: {
    cost_ranges: [
      { limit: 10 },
      { cost_multiple: 900000000, limit: 100 },
      { cost_multiple: 250000000, limit: -1 },
      { cost_multiple: 300000000, limit: 400 },
      { cost_multiple: 500000000, limit: 300 },
      { cost_multiple: 600000000, limit: 200 },
    ],
    increment: 1,
    suffix: 'hour',
  },
};

export const NumberFeatureMeasurable: TNumberFeature = {
  label: 'hourly-price',
  measurable: true,
  name: 'Hourly Price',
  type: 'number',
  values: [
    NumberFeatureMeasurableValueFree,
    NumberFeatureMeasurableValueUnavailable,
    NumberFeatureMeasurableValueTiered,
  ],
  value: NumberFeatureMeasurableValueFree,
  value_string: 'NVIDIA 1080ti 250 GB SSD',
};

export const BooleanFeatureStatic: TExpandedFeature = {
  label: 'redundancy',
  name: 'High Availability',
  type: 'boolean',
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
  value: { label: 'false', name: 'false' },
  value_string: 'No',
};

export const BooleanFeatureStaticTrue = {
  ...BooleanFeatureStatic,
  value: { label: 'true', name: 'true' },
  value_string: 'Yes',
};

export const BooleanFeatureStaticFalse = {
  ...BooleanFeatureStatic,
  value: { label: 'false', name: 'false' },
  value_string: 'No',
};

export const BooleanFeatureCustom: TExpandedFeature = {
  ...BooleanFeatureStatic,
  customizable: true,
  downgradable: true,
  upgradable: true,
};

export const ExpandedPlan: TExpandedPlan = {
  body: {
    cost: 500,
    features: [
      { feature: StringFeatureStatic.label, value: StringFeatureStatic.value.label },
      { feature: NumberFeatureStatic.label, value: NumberFeatureStatic.value.label },
      { feature: BooleanFeatureStatic.label, value: BooleanFeatureStatic.value.label },
    ],
    label: 'kitefin',
    name: 'Kitefin',
    product_id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
    provider_id: '2346mdxcuca9ez2n93f72nb2fpjgu',
    regions: ['235mhkk15ky7ha9qpu4gazrqjt2gr', '235m2c51y0625vvtk6ptf55bhpkty'],
    resizable_to: ['23556xtwybe9zv877e6g2c7ygnxpj', '2358u3xj4d8x5qud8x1atgafwchfy'],
    state: 'available',
    trial_days: 0,
    defaultCost: 500,
    expanded_features: [StringFeatureStatic, NumberFeatureStatic, BooleanFeatureStatic],
    free: false,
  },
  id: '235abe2ba8b39e941u2h70ayw5m9j',
  type: 'plan',
  version: 1,
};

export const ExpandedPlanCustom: TExpandedPlan = {
  body: {
    cost: 3300,
    features: [
      { feature: StringFeatureCustom.label, value: StringFeatureCustom.value.label },
      { feature: NumberFeatureCustom.label, value: NumberFeatureCustom.value.label },
      { feature: BooleanFeatureCustom.label, value: BooleanFeatureCustom.value.label },
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
    expanded_features: [StringFeatureCustom, NumberFeatureCustom, BooleanFeatureCustom],
    free: false,
  },
  id: '235exy25wvzpxj52p87bh87gbnj4y',
  type: 'plan',
  version: 1,
};

export const ExpandedPlanMeasurable: TExpandedPlan = {
  body: {
    cost: 0,
    features: [
      { feature: NumberFeatureMeasurable.label, value: NumberFeatureMeasurable.value.label },
    ],
    label: 'nvidia-1080ti-250gb-ssd',
    name: 'NVIDIA 1080Ti',
    product_id: '234nbp17j5zrvb2ym49647kgtyv2a',
    provider_id: '234a6uzew2vfe1j69ntn67bf24ac0',
    regions: ['235n4f9pxf8eyraj3y159x89z6jer'],
    resizable_to: [],
    state: 'available',
    expanded_features: [NumberFeatureMeasurable],
    free: false,
  },
  id: '2357v8j36f5h866c32ddwwjxvfe8j',
  type: 'plan',
  version: 1,
};

export const Product: Catalog.Product = {
  body: {
    billing: { currency: 'usd', type: 'monthly-prorated' },
    documentation_url: 'https://jawsdb.com/docs',
    feature_types: [
      StringFeatureStatic,
      StringFeatureCustom,
      NumberFeatureStatic,
      NumberFeatureMeasurable,
      NumberFeatureCustom,
      BooleanFeatureStatic,
      BooleanFeatureCustom,
    ],
    images: [
      'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
      'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
      'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
      'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
    ],
    integration: {
      base_url: 'https://api.jawsdb.com/mysql',
      features: { access_code: false, plan_change: true, region: 'user-specified', sso: true },
      provisioning: 'public',
      sso_url: 'https://api.jawsdb.com/mysql',
      version: 'v1',
    },
    label: 'jawsdb-mysql',
    listing: {
      listed: true,
      marketing: { beta: false, featured: false, new: false },
      public: true,
    },
    logo_url: 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png',
    name: 'JawsDB MySQL',
    provider_id: '2346mdxcuca9ez2n93f72nb2fpjgu',
    state: 'available',
    support_email: 'support@jawsdb.com',
    tagline: 'Fast, reliable, no-bullshark MySQL as a Service',
    tags: ['database'],
    terms: { provided: false },
    value_props: [
      {
        body:
          'Get access to the same database trusted by sites such as Google, Facebook, Twitter, Youtube, and more.',
        header: 'Trust in Jaws',
      },
      {
        body:
          'In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.',
        header: 'Backups',
      },
      {
        body:
          'Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!',
        header: 'Databites',
      },
      {
        body:
          "Regardless of how big of a wave you're riding, JawsDB makes it easy to scale your database performance.",
        header: 'Scale',
      },
      {
        body:
          'For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.',
        header: 'Stay in Control',
      },
      {
        body:
          "The world doesn't need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.",
        header: 'Data Replication',
      },
    ],
  },
  id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
  type: 'product',
  version: 1,
};

export const Provider: Catalog.Provider = {
  body: {
    label: 'jawsdb',
    name: 'JawsDB',
    team_id: '2011j53emxt7j7a8dch3a696t0936',
  },
  id: '2346mdxcuca9ez2n93f72nb2fpjgu',
  type: 'provider',
  version: 1,
};

export const Region: Catalog.Region = {
  body: {
    location: 'us-east-1',
    name: 'AWS - US East 1 (N. Virginia)',
    platform: 'aws',
    priority: 100,
  },
  id: '235m2c51y0625vvtk6ptf55bhpkty',
  type: 'region',
  version: 1,
};
