import { Catalog } from '../types/catalog';

const id = '2015-12-24T19:22:00-0300';

const body: Catalog.ProductBody = {
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
  name: '',
  listing: { listed: true, marketing: { beta: false, featured: false, new: false }, public: true },
  logo_url: '',
  provider_id: '',
  state: '',
  support_email: '',
  tagline: '',
  tags: [],
  terms: { provided: false },
  value_props: [],
};

const skeletonProducts: Catalog.Product[] = [
  {
    id,
    body: {
      ...body,
      name: 'David Leger',
      tagline: 'David Leger: lover of cats, conqueror of front-ends',
      tags: [
        'ai-ml',
        'database',
        'logging',
        'memory-store',
        'messaging',
        'monitoring',
        'optimization',
        'search',
      ],
    },
    type: 'product',
    version: 1,
  },
  {
    id,
    body: {
      ...body,
      name: 'Sam Slotsky',
      tagline: 'Sam Slotsky: smoker of meats, crooner of sax, master of all that is architectural',
      tags: [
        'authentication',
        'database',
        'memory-store',
        'messaging',
        'monitoring',
        'utility',
        'worker',
      ],
    },
    type: 'product',
    version: 1,
  },
  {
    id,
    body: {
      ...body,
      name: 'Jessica Johnson',
      tagline: 'Jessica Johnson: critical examiner, curious explorer of technology',
      tags: ['cms', 'database', 'memory-store', 'messaging', 'utility', 'worker'],
    },
    type: 'product',
    version: 1,
  },
  {
    id,
    body: {
      ...body,
      name: 'Nicholas Tassone',
      tagline:
        'Nicolas Tassone: king of pixels, warrior of the unknown, our shining light in the darkness',
      tags: ['database', 'logging', 'messaging', 'monitoring', 'optimization', 'runtime'],
    },
    type: 'product',
    version: 1,
  },
  {
    id,
    body: {
      ...body,
      name: 'James Bowes',
      tagline:
        'James Bowes: the mighty moustache, paladin of all things technical and distrubuted.',
      tags: ['database', 'logging', 'messaging', 'optimization', 'runtime', 'sell-your-service'],
    },
    type: 'product',
    version: 1,
  },
];

export default skeletonProducts;
