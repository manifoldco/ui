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
  numeric_details: TNumberNumericDetails;
}

interface TNumberNumericDetails extends Catalog.FeatureNumericDetails {
  cost_ranges: Catalog.FeatureNumericRange[];
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
  numeric_details: { cost_ranges: [], increment: 1, suffix: 'hour' },
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

export const Regions: Catalog.Region[] = [
  {
    body: {
      location: 'eu-west-1',
      name: 'AWS - EU West 1 (Ireland)',
      platform: 'aws',
      priority: 98,
    },
    id: '235m2c51y0625vvtk6ptf55bhpkty',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ap-south-1',
      name: 'AWS - Asia South 1 (Mumbai)',
      platform: 'aws',
      priority: 96,
    },
    id: '235muac09p0qf9hwqcfbv6kw9at94',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-east-1',
      name: 'AWS - US East 1 (N. Virginia)',
      platform: 'aws',
      priority: 100,
    },
    id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ca-central-1',
      name: 'AWS - CA Central 1 (Canada Central)',
      platform: 'aws',
      priority: 97,
    },
    id: '235x70bffdftggtpxxp3ar601j2qa',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'eu-central-1',
      name: 'AWS - EU Central 1 (Frankfurt)',
      platform: 'aws',
      priority: 98,
    },
    id: '235h6mbrrafzbhc4pau7mfm6f1c12',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'eu-west-2',
      name: 'AWS - EU West 2 (London)',
      platform: 'aws',
      priority: 98,
    },
    id: '235tzgr871feggvepe7jmkm1x4r40',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ap-northeast-1',
      name: 'AWS - Asia Pacific Northeast 1 (Tokyo)',
      platform: 'aws',
      priority: 96,
    },
    id: '235n0zubj5zv0h67cfqd6nemktr72',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ap-southeast-1',
      name: 'AWS - Asia Pacific Southeast 1 (Singapore)',
      platform: 'aws',
      priority: 96,
    },
    id: '235pczj6ej834n25rm4c5atnwh3py',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-west-1',
      name: 'AWS - US West 1 (N. California)',
      platform: 'aws',
      priority: 99,
    },
    id: '235nu2c0z73hq1f9qby444nnnq1fu',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ap-northeast-2',
      name: 'AWS - Asia Pacific Northeast 2 (Seoul)',
      platform: 'aws',
      priority: 96,
    },
    id: '235k1hqjt37duqn6tmgtb3cw8tm2p',
    type: 'region',
    version: 1,
  },
  {
    body: { location: 'global', name: 'All Regions', platform: 'all', priority: 100 },
    id: '235n4f9pxf8eyraj3y159x89z6jer',
    type: 'region',
    version: 1,
  },
  {
    body: { location: 'us-east-2', name: 'AWS - US East 2 (Ohio)', platform: 'aws', priority: 99 },
    id: '235krnd90mb51mu21rgf634vyyvnw',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-west-2',
      name: 'AWS - US West 2 (Oregon)',
      platform: 'aws',
      priority: 99,
    },
    id: '235t4e0xt86hrgefbvyzh6f5dr7n4',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ap-southeast-2',
      name: 'AWS - Asia Pacific Southeast 2 (Sydney)',
      platform: 'aws',
      priority: 96,
    },
    id: '235rtvbtj2xr3hn5ghtkab5m0bxrm',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'sa-east-1',
      name: 'AWS - South America East 1 (Sao Paulo)',
      platform: 'aws',
      priority: 96,
    },
    id: '235jkr4nn8437aq9hy3ed7kt32uay',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'dallas-1',
      name: 'Rackspace - Dallas 1',
      platform: 'rackspace',
      priority: 95,
    },
    id: '235kmne2kdkf7gdwjw8z5ekvjpugu',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-central-1',
      name: 'Google Cloud - US  Central 1',
      platform: 'gcp',
      priority: 95,
    },
    id: '235p16bz8n7qkjtvqyg599qtqa9ur',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-east-1',
      name: 'Google Cloud - US  East 1',
      platform: 'gcp',
      priority: 95,
    },
    id: '235wy26njfzf53k1d050k2eg9f5ey',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-east-4',
      name: 'Google Cloud - US  East 4',
      platform: 'gcp',
      priority: 95,
    },
    id: '235u7nm47cknwjyjdyqwxg070zfmm',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-west-1',
      name: 'Google Cloud - US  West 1',
      platform: 'gcp',
      priority: 95,
    },
    id: '235uxnm8fnf6d2wbzthz60e347rje',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'us-west-2',
      name: 'Google Cloud - US  West 2',
      platform: 'gcp',
      priority: 95,
    },
    id: '235gpteq8z5tfk76f8vxhft8b2yap',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'eu-west-1',
      name: 'Google Cloud - Europe  West 1',
      platform: 'gcp',
      priority: 95,
    },
    id: '235hnmde7fybzbbyugqkqjjpf4r78',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'eu-west-2',
      name: 'Google Cloud - Europe  West 2',
      platform: 'gcp',
      priority: 95,
    },
    id: '235v09pa9uhr2jzpf2j07pyqb771p',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'eu-west-3',
      name: 'Google Cloud - Europe  West 3',
      platform: 'gcp',
      priority: 95,
    },
    id: '235vjynwbkcww95jw7q4d0ypve94m',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ams2',
      name: 'Digital Ocean - Amsterdam 2',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235xzuww5zhppnnxxg4xt6wkjjn0r',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'blr1',
      name: 'Digital Ocean - Bangalore 1 ',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235uyvbx6qvvar88hdwku19nck34e',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'nyc1',
      name: 'Digital Ocean - New York 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235j17hyc3kw0bd5bgh799xdugq7a',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'nyc2',
      name: 'Digital Ocean - New York 2',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235kwrqmb2jfecj6dk9v06y6eqqpu',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'lon1',
      name: 'Digital Ocean - London 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235gyw8hbev5jy5j3tdzdtpcnzaau',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'nyc3',
      name: 'Digital Ocean - New York 3',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235jkamf0aptkmjaauzd6f73ttk7j',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'sfo1',
      name: 'Digital Ocean - San Francisco 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235u04aer2rrcw4zf15zehy63x546',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'fra1',
      name: 'Digital Ocean - Frankfurt 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235hw0j1561jp0qnarhnubmwjp2tj',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'sfo2',
      name: 'Digital Ocean - San Francisco 2',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235z9fptp2za794z7yxn0aft1krza',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'tor1',
      name: 'Digital Ocean - Toronto 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235htn96a2v1w1vzey5k49uvqatvc',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'ams3',
      name: 'Digital Ocean - Amsterdam 3',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235wf6yejbydr3vndv4rndqxhrjm0',
    type: 'region',
    version: 1,
  },
  {
    body: {
      location: 'sgp1',
      name: 'Digital Ocean - Singapore 1',
      platform: 'digital-ocean',
      priority: 95,
    },
    id: '235qxr0g6akn861dqxw0yfkykg0hw',
    type: 'region',
    version: 1,
  },
];

export const ZiggeoPlan: Catalog.ExpandedPlan = {
  body: {
    cost: 99900,
    features: [
      { feature: 'recording_sd', value: 'enterprise-seconds' },
      { feature: 'recording_hd', value: 'enterprise-seconds' },
      { feature: 'playing_sd', value: 'enterprise-seconds' },
      { feature: 'playing_hd', value: 'enterprise-seconds' },
      { feature: 'storage_sd', value: 'enterprise-seconds' },
      { feature: 'storage_hd', value: 'enterprise-seconds' },
      { feature: 'effects_sd', value: 'enterprise-seconds' },
      { feature: 'effects_hd', value: 'enterprise-seconds' },
      { feature: 'analysis', value: 'enterprise-seconds' },
      { feature: 'secure-video-access', value: 'true' },
      { feature: 'screen-capture', value: 'true' },
      { feature: 'video-profiles', value: 'true' },
      { feature: 'nsfw-detection', value: 'true' },
      { feature: 'sub-accounts', value: 'unlimited' },
      { feature: 'on-the-fly-transcoding', value: 'true' },
      { feature: 'webhooks', value: 'true' },
      { feature: '3rd-party-integrations', value: 'true' },
      { feature: 'easy-share', value: 'true' },
    ],
    label: 'enterprise',
    name: 'Enterprise',
    product_id: '234yycr3mf5f2hrw045vuxeatnd50',
    provider_id: '234a33rd2pxfzq9qfk0v5qdrykhcp',
    regions: ['235n4f9pxf8eyraj3y159x89z6jer'],
    state: 'available',
    trial_days: 0,
    defaultCost: 99900,
    expanded_features: [
      {
        label: 'recording_sd',
        measurable: true,
        name: 'Video Recorder - SD',
        type: 'number',
        values: [
          {
            label: 'standard-seconds',
            name: 'Standard Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 202680 }, { cost_multiple: 300000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 210000 }, { cost_multiple: 200000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 666660 }, { cost_multiple: 150000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 666660 }, { cost_multiple: 150000, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'recording_hd',
        measurable: true,
        name: 'Video Recorder - HD',
        type: 'number',
        values: [
          {
            label: 'standard-no-recording',
            name: 'No Recording',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 125640 }, { cost_multiple: 400000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 422520 }, { cost_multiple: 300000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 422520 }, { cost_multiple: 300000, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'playing_sd',
        measurable: true,
        name: 'Video Player - SD',
        type: 'number',
        values: [
          {
            label: 'standard-seconds',
            name: 'Standard Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 1014000 }, { cost_multiple: 11667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 807000 }, { cost_multiple: 6667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 3000000 }, { cost_multiple: 6667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 3000000 }, { cost_multiple: 6667, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'playing_hd',
        measurable: true,
        name: 'Video Player - HD',
        type: 'number',
        values: [
          {
            label: 'standard-no-playing',
            name: 'No Playing',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 750000 }, { cost_multiple: 13334, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 2064840 }, { cost_multiple: 11667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 2064840 }, { cost_multiple: 11667, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'storage_sd',
        measurable: true,
        name: 'Video Storage - SD',
        type: 'number',
        values: [
          {
            label: 'standard-seconds',
            name: 'Standard Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 1216560 }, { cost_multiple: 21667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 1333320 }, { cost_multiple: 15000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 3000000 }, { cost_multiple: 10000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 3000000 }, { cost_multiple: 10000, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'storage_hd',
        measurable: true,
        name: 'Video Storage - HD',
        type: 'number',
        values: [
          {
            label: 'standard-no-storage',
            name: 'No Storage',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 717300 }, { cost_multiple: 30000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 3150420 }, { cost_multiple: 21667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 3150420 }, { cost_multiple: 21667, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'effects_sd',
        measurable: true,
        name: 'Video Effects - SD',
        type: 'number',
        values: [
          {
            label: 'standard-no-effects',
            name: 'No Effects',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 191280 }, { cost_multiple: 333334, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 511740 }, { cost_multiple: 250000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 511740 }, { cost_multiple: 250000, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'effects_hd',
        measurable: true,
        name: 'Video Effects - HD',
        type: 'number',
        values: [
          {
            label: 'standard-no-effects',
            name: 'No Effects',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 135000 }, { cost_multiple: 666667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 499980 }, { cost_multiple: 500000, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 499980 }, { cost_multiple: 500000, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'analysis',
        measurable: true,
        name: 'A.I. Video Analysis',
        type: 'number',
        values: [
          {
            label: 'standard-no-analysis',
            name: 'No Analysis',
            numeric_details: { cost_ranges: [], suffix: 'Seconds' },
          },
          {
            label: 'pro-seconds',
            name: 'Pro Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 230640 }, { cost_multiple: 416667, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
          {
            label: 'enterprise-seconds',
            name: 'Enterprise Seconds',
            numeric_details: {
              cost_ranges: [{ limit: 755880 }, { cost_multiple: 333334, limit: -1 }],
              increment: 1,
              suffix: 'Seconds',
            },
          },
        ],
        value: {
          label: 'enterprise-seconds',
          name: 'Enterprise Seconds',
          numeric_details: {
            cost_ranges: [{ limit: 755880 }, { cost_multiple: 333334, limit: -1 }],
            increment: 1,
            suffix: 'Seconds',
          },
        },
        value_string: 'Enterprise Seconds',
      },
      {
        label: 'secure-video-access',
        name: 'Secure Video Access',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'screen-capture',
        name: 'Screen Capture',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'video-profiles',
        name: 'Video Profiles',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'nsfw-detection',
        name: 'Not - Safe for Work Detection',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'sub-accounts',
        name: 'Sub Accounts',
        type: 'string',
        values: [
          { label: 'none', name: 'None' },
          { label: 'five-shared-apps', name: 'Up to 5 shared apps only' },
          { label: 'unlimited', name: 'Unlimited' },
        ],
        value: { label: 'unlimited', name: 'Unlimited' },
        value_string: 'Unlimited',
      },
      {
        label: 'on-the-fly-transcoding',
        name: 'On Fly Transcoding',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'webhooks',
        name: 'Webhooks',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: '3rd-party-integrations',
        name: '3rd Party Integrations',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
      {
        label: 'easy-share',
        name: 'Easy Share',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
        value: { label: 'true', name: 'true' },
        value_string: 'true',
      },
    ],
    free: false,
  },
  id: '235f9mmmc7qg4h5zzg8mrqxer5acp',
  type: 'plan',
  version: 1,
};
