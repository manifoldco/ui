export const ExpandedPlan: Catalog.ExpandedPlan = {
  body: {
    cost: 500,
    features: [
      {
        feature: 'static-ram',
        value: 'ram-generated-0',
      },
      {
        feature: 'static-storage',
        value: 'storage-generated-1',
      },
      {
        feature: 'static-connections',
        value: 'connections-generated-2',
      },
      {
        feature: 'static-single-tenant',
        value: 'false',
      },
      {
        feature: 'static-rollback',
        value: 'rollback-generated-4',
      },
      {
        feature: 'static-high-availability',
        value: 'false',
      },
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
    expanded_features: [
      {
        label: 'static-ram',
        name: 'RAM',
        type: 'string',
        values: [
          {
            label: 'ram-generated-0',
            name: 'Shared',
          },
          {
            label: 'ram-generated-10',
            name: '1 GB',
          },
          {
            label: 'ram-generated-14',
            name: '2 GB',
          },
          {
            label: 'ram-generated-17',
            name: '4 GB',
          },
          {
            label: 'ram-generated-21',
            name: '8 GB',
          },
        ],
        value: {
          label: 'ram-generated-0',
          name: 'Shared',
        },
        value_string: 'Shared',
      },
      {
        label: 'static-storage',
        name: 'Storage',
        type: 'string',
        values: [
          {
            label: 'storage-generated-1',
            name: '250 MB',
          },
          {
            label: 'storage-generated-6',
            name: '1 GB',
          },
          {
            label: 'storage-generated-8',
            name: '2.5 GB',
          },
          {
            label: 'storage-generated-11',
            name: '5 GB',
          },
          {
            label: 'storage-generated-15',
            name: '50 GB',
          },
          {
            label: 'storage-generated-18',
            name: '100 GB',
          },
          {
            label: 'storage-generated-22',
            name: '250 GB',
          },
        ],
        value: {
          label: 'storage-generated-1',
          name: '250 MB',
        },
        value_string: '250 MB',
      },
      {
        label: 'static-connections',
        name: 'Connections',
        type: 'string',
        values: [
          {
            label: 'connections-generated-2',
            name: '10',
          },
          {
            label: 'connections-generated-7',
            name: '15',
          },
          {
            label: 'connections-generated-9',
            name: '30',
          },
          {
            label: 'connections-generated-12',
            name: '66',
          },
          {
            label: 'connections-generated-16',
            name: '150',
          },
          {
            label: 'connections-generated-19',
            name: '300',
          },
          {
            label: 'connections-generated-23',
            name: '600',
          },
        ],
        value: {
          label: 'connections-generated-2',
          name: '10',
        },
        value_string: '10',
      },
      {
        label: 'static-single-tenant',
        name: 'Single Tenant',
        type: 'boolean',
        values: [
          {
            label: 'true',
            name: 'true',
          },
          {
            label: 'false',
            name: 'false',
          },
        ],
        value: {
          label: 'false',
          name: 'false',
        },
        value_string: 'false',
      },
      {
        label: 'static-high-availability',
        name: 'High Availability',
        type: 'boolean',
        values: [
          {
            label: 'true',
            name: 'true',
          },
          {
            label: 'false',
            name: 'false',
          },
        ],
        value: {
          label: 'false',
          name: 'false',
        },
        value_string: 'false',
      },
      {
        label: 'static-rollback',
        name: 'Rollback',
        type: 'string',
        values: [
          {
            label: 'rollback-generated-4',
            name: '0 Days',
          },
          {
            label: 'rollback-generated-13',
            name: '1 Day',
          },
          {
            label: 'rollback-generated-20',
            name: '2 Days',
          },
        ],
        value: {
          label: 'rollback-generated-4',
          name: '0 Days',
        },
        value_string: '0 Days',
      },
    ],
    free: false,
  },
  id: '235abe2ba8b39e941u2h70ayw5m9j',
  type: 'plan',
  version: 1,
};

export const ExpandedPlanCustom: Catalog.ExpandedPlan = {
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
};

export const Product: Catalog.Product = {
  body: {
    billing: { currency: 'usd', type: 'monthly-prorated' },
    documentation_url: 'https://jawsdb.com/docs',
    feature_types: [
      {
        label: 'static-ram',
        name: 'RAM',
        type: 'string',
        values: [
          { label: 'ram-generated-0', name: 'Shared' },
          { label: 'ram-generated-10', name: '1 GB' },
          { label: 'ram-generated-14', name: '2 GB' },
          { label: 'ram-generated-17', name: '4 GB' },
          { label: 'ram-generated-21', name: '8 GB' },
        ],
      },
      {
        label: 'static-storage',
        name: 'Storage',
        type: 'string',
        values: [
          { label: 'storage-generated-1', name: '250 MB' },
          { label: 'storage-generated-6', name: '1 GB' },
          { label: 'storage-generated-8', name: '2.5 GB' },
          { label: 'storage-generated-11', name: '5 GB' },
          { label: 'storage-generated-15', name: '50 GB' },
          { label: 'storage-generated-18', name: '100 GB' },
          { label: 'storage-generated-22', name: '250 GB' },
        ],
      },
      {
        label: 'static-connections',
        name: 'Connections',
        type: 'string',
        values: [
          { label: 'connections-generated-2', name: '10' },
          { label: 'connections-generated-7', name: '15' },
          { label: 'connections-generated-9', name: '30' },
          { label: 'connections-generated-12', name: '66' },
          { label: 'connections-generated-16', name: '150' },
          { label: 'connections-generated-19', name: '300' },
          { label: 'connections-generated-23', name: '600' },
        ],
      },
      {
        label: 'static-single-tenant',
        name: 'Single Tenant',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
      },
      {
        label: 'static-high-availability',
        name: 'High Availability',
        type: 'boolean',
        values: [{ label: 'true', name: 'true' }, { label: 'false', name: 'false' }],
      },
      {
        label: 'static-rollback',
        name: 'Rollback',
        type: 'string',
        values: [
          { label: 'rollback-generated-4', name: '0 Days' },
          { label: 'rollback-generated-13', name: '1 Day' },
          { label: 'rollback-generated-20', name: '2 Days' },
        ],
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
      },
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

export const Plan: Catalog.ExpandedPlan = {
  body: {
    cost: 500,
    features: [
      {
        feature: 'ram',
        value: 'Shared',
      },
      {
        feature: 'storage',
        value: '250 MB',
      },
      {
        feature: 'connections',
        value: '10',
      },
      {
        feature: 'single-tenant',
        value: 'false',
      },
      {
        feature: 'rollback',
        value: '0 Days',
      },
      {
        feature: 'high-availability',
        value: 'false',
      },
    ],
    label: 'kitefin',
    name: 'Kitefin',
    product_id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
    provider_id: '2346mdxcuca9ez2n93f72nb2fpjgu',
    regions: ['235mhkk15ky7ha9qpu4gazrqjt2gr', '235m2c51y0625vvtk6ptf55bhpkty'],
    resizable_to: [],
    state: 'available',
    trial_days: 0,
    free: false,
  },
  id: '235abe2ba8b39e941u2h70ayw5m9j',
  type: 'plan',
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
