import {
  PlanState,
  Product,
  ProductConnection,
  ProductCredentialsSupportType,
  ProductState,
} from '../../../types/graphql';

const emptyProducts: ProductConnection = {
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

// https://graphqlbin.com/v2/gnyDsm
const product: Product = {
  categories: [{ label: 'messaging', products: emptyProducts }],
  displayName: 'Mailgun',
  documentationUrl: 'https://documentation.mailgun.com/',
  id: '234mauvfd213a0a87q42eb0mmq5ye',
  images: [
    'https://cdn.manifold.co/providers/mailgun/mailgun/images/zkj2ruj3wtbnbyjy6ynrhcc85r.png',
    'https://cdn.manifold.co/providers/mailgun/mailgun/images/qdjte3ux3q4jvvx3a7ze6f078g.png',
    'https://cdn.manifold.co/providers/mailgun/mailgun/images/5bf55h4dxkvqge5ujyj5mj9260.png',
  ],
  label: 'mailgun',
  logoUrl: 'https://cdn.manifold.co/providers/mailgun/logos/q922nwncyuw263chbg86e0rw1m.png',
  plans: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 0,
          displayName: 'Pistol',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr3edh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1mq6x3fdhfpavb1d5p7600000000',
                  label: 'emails',
                  displayName: 'Emails',
                  displayValue: '30000',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9pk6ut25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1mq6x3fdhfpjw3k0000000000000',
                  label: 'ips',
                  displayName: 'IPs',
                  displayValue: '0',
                },
              },
            ],
          },
          free: true,
          id: '2350zr1ha983rd1mpqbh6h6h826ty',
          label: 'pistol',
          meteredFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          regions: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235n4f9pxf8eyraj3y159x89z6jer',
                  platform: 'all',
                  dataCenter: 'global',
                  displayName: 'All Regions',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kc5hk2ttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 5000,
          displayName: 'Musket',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr3edh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'dnuq6uv5ehfpavb1d5p7600000000',
                  label: 'emails',
                  displayName: 'Emails',
                  displayValue: '100000',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9pk6ut25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'dnuq6uv5ehfpjw3k0000000000000',
                  label: 'ips',
                  displayName: 'IPs',
                  displayValue: '0',
                },
              },
            ],
          },
          free: false,
          id: '2354vwq0xapn9zxnh58zx6nuv512w',
          label: 'musket',
          meteredFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          regions: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235n4f9pxf8eyraj3y159x89z6jer',
                  platform: 'all',
                  dataCenter: 'global',
                  displayName: 'All Regions',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hj3jttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 25000,
          displayName: 'Shotgun',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr3edh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edm6yx37enq5ytbdc5mprwr000000',
                  label: 'emails',
                  displayName: 'Emails',
                  displayValue: '500000',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9pk6ut25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edm6yx37enq5yubgec00000000000',
                  label: 'ips',
                  displayName: 'IPs',
                  displayValue: '0',
                },
              },
            ],
          },
          free: false,
          id: '2356ckx1rrjw4k3yy8nqu8r2ggv9a',
          label: 'shotgun',
          meteredFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          regions: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235n4f9pxf8eyraj3y159x89z6jer',
                  platform: 'all',
                  dataCenter: 'global',
                  displayName: 'All Regions',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kc5hk2ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 50000,
          displayName: 'Rifle',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr3edh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e9mpcv35bxjpurb9dhtg000000000',
                  label: 'emails',
                  displayName: 'Emails',
                  displayValue: '1000000',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9pk6ut25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e9mpcv35bxmq0wr00000000000000',
                  label: 'ips',
                  displayName: 'IPs',
                  displayValue: '1',
                },
              },
            ],
          },
          free: false,
          id: '235buzawyzcc0gu4hacya2nvvx28a',
          label: 'rifle',
          meteredFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          regions: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235n4f9pxf8eyraj3y159x89z6jer',
                  platform: 'all',
                  dataCenter: 'global',
                  displayName: 'All Regions',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
    ],
  },
  provider: {
    id: '234ae8fx4ud4wqj7q0vy7vhjxvjb6',
    displayName: 'Mailgun',
    label: 'mailgun',
    logoUrl: '',
    supportEmail: '',
    url: '',
  },
  settings: {
    ssoSupported: true,
    credentialsSupport: ProductCredentialsSupportType.Single,
  },
  setupStepsHtml: '',
  state: ProductState.Available,
  supportEmail: 'help@mailgun.com',
  tagline: 'The Email Service For Developers',
  termsUrl: 'https://www.mailgun.com/terms',
  valueProps: [
    {
      header: 'Engineered for developers for reliability',
      body:
        "Everything is built API first with a focus on simplicity and compliance to standards. We're serious about uptime and we have the track record to prove it.",
    },
    {
      header: 'Help when you need it',
      body: 'Have a question? Our support team is available 24/7/365.',
    },
    {
      header: 'Powerful sending infrastructure',
      body:
        'Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. Scale quickly, whether you need to send 10 or 10 million emails.',
    },
    {
      header: 'Intelligent inbound routing & storage',
      body:
        'Route and forward email directly into your app or inbox. Email parsing turns your emails into easy-to-digest structured data and spam filtering keeps out unwanted emails.',
    },
    {
      header: 'Tracking and analytics',
      body:
        'Searchable logs mean you always know what is happening to your email while tags make it easy to A/B test and report on your data, and all via our webhooks.',
    },
    {
      header: 'Email validation',
      body:
        'Advanced email validation increases your conversions. Our jQuery plugin enables you to integrate it into your web forms fast.',
    },
  ],
  valuePropsHtml:
    '<h3>Engineered for developers for reliability</h3><p>Everything is built API first with a focus on simplicity and compliance to standards. We&#39;re serious about uptime and we have the track record to prove it.</p><h3>Help when you need it</h3><p>Have a question? Our support team is available 24/7/365.</p><h3>Powerful sending infrastructure</h3><p>Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. Scale quickly, whether you need to send 10 or 10 million emails.</p><h3>Intelligent inbound routing &amp; storage</h3><p>Route and forward email directly into your app or inbox. Email parsing turns your emails into easy-to-digest structured data and spam filtering keeps out unwanted emails.</p><h3>Tracking and analytics</h3><p>Searchable logs mean you always know what is happening to your email while tags make it easy to A/B test and report on your data, and all via our webhooks.</p><h3>Email validation</h3><p>Advanced email validation increases your conversions. Our jQuery plugin enables you to integrate it into your web forms fast.</p>',
};

export default product;
