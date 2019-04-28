const skeletonProduct: Catalog.Product = {
  body: {
    billing: { type: 'monthly-prorated', currency: 'usd' },
    documentation_url: '',
    feature_types: [],
    images: [],
    integration: {
      base_url: '',
      features: { access_code: false, plan_change: true, region: 'user-specified', sso: true },
      provisioning: '',
      sso_url: '',
      version: 'v1',
    },
    label: '',
    name: 'Deep Philosophical product',
    listing: {
      listed: true,
      marketing: { beta: false, featured: false, new: false },
      public: true,
    },
    logo_url: '',
    provider_id: '',
    state: 'available',
    support_email: 'support@jawsdb.com',
    tagline:
      'Introducing the all-new Honda Ferrari™. Only from Ford. It’s a car commercial the whole time.',
    tags: [],
    terms: { provided: false },
    value_props: [
      {
        header: 'What is our purpose?',
        body: 'Where do we come from?',
      },
      {
        header: 'Where are we going?',
        body: 'What is truth? What is free will?',
      },
      {
        header: 'Is there life after death?',
        body:
          'Are we alone in the universe? Is there a God watching us, or are we watching ourselves?',
      },
    ],
  },
  id: '',
  version: 1,
  type: 'product',
};

export default skeletonProduct;
