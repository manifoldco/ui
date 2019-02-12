import { ProductDetails } from './product-details';

const product = {
  body: {
    billing: { currency: 'usd', type: 'monthly-prorated' },
    documentation_url: 'https://jawsdb.com/docs',
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

describe('<product-details>', () => {
  it('displays tagline', async () => {
    let element;
    expect(element).toMatchSnapshot();
  });
});
