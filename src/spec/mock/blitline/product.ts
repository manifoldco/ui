import {
  PlanState,
  Product,
  ProductConnection,
  ProductState,
  ProductCredentialsSupportType,
} from '../../../types/graphql';

const emptyProducts: ProductConnection = {
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

// https://graphqlbin.com/v2/gnyDsm
const product: Product = {
  categories: [
    {
      displayName: 'Optimization',
      label: 'optimization',
      id: '00000000000000000000000000000',
      products: emptyProducts,
    },
  ],
  displayName: 'Blitline',
  documentationUrl: 'http://helpdocs.blitline.com/',
  id: '234htwpkzvg1vuyez6uybfhv8rjb2',
  images: [
    'https://cdn.manifold.co/providers/blitline/screenshots/1.png',
    'https://cdn.manifold.co/providers/blitline/screenshots/2.png',
    'https://cdn.manifold.co/providers/blitline/screenshots/3.png',
    'https://cdn.manifold.co/providers/blitline/screenshots/4.png',
  ],
  label: 'blitline',
  listing: { beta: false, featured: false, new: false, comingSoon: false },
  logoUrl: 'https://cdn.manifold.co/providers/blitline/logos/blitline.png',
  plans: {
    pageInfo: { hasNextPage: false, hasPreviousPage: false },
    edges: [
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 0,
          displayName: 'Developer',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6ht64tb3d1v70ukm6dpp8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'chjqctbcdxr6awjzc9gpwt3qd5j78',
                  label: 'bandwidth',
                  displayName: 'Bandwidth',
                  displayValue: 'Unlimited',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8tvpetq6aebmcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'chjqctbcdxr6awjzctt6at9dd1qqa',
                  label: 'free-hours',
                  displayName: 'Free Hours',
                  displayValue: '2',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8ukpc8rp6y3be0t3gchtchq6ew35ehh6p8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'chjqctbcdxr6awjzctt6at9dd5pp2',
                  label: 'free-imagga-images',
                  displayName: 'Free Imagga Images',
                  displayValue: '100',
                },
              },
            ],
          },
          free: true,
          id: '2355xq63b60wqpxd1y2gewh9bckgr',
          label: 'developer',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pd9v64cb3f1nq0ck2c8wp8vk7e1jq8rkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjqctbcdxr6awjzd5pp2tv7c4ppj',
                  label: 'imagga-images',
                  displayName: 'Imagga Images',
                  numericDetails: { costTiers: [], unit: 'image' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61vpptk3chn72dkqerwp8x3bd9uq8cvecmwpew9renh6ct3j48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjqctbcdxr6awjze1t6yrv5edtpj',
                  label: 'processing-duration',
                  displayName: 'Processing Duration',
                  numericDetails: { costTiers: [], unit: 'hour' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1qcdup4d33dtrpmxbmc9jp6t3he0w7ark5cdvj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'chjqctbcdxr6awjzetmp8tbf5njpw',
                  label: 'video-encoding',
                  displayName: 'Video Encoding',
                  numericDetails: { costTiers: [], unit: 'minute' },
                },
              },
            ],
          },
          regions: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kcnhk2tt25gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 700,
          displayName: 'Standard',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6ht64tb3d1v70ukm6dpp8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edu62vk4c5t68qv2c5q68xv9chu6g',
                  label: 'bandwidth',
                  displayName: 'Bandwidth',
                  displayValue: 'Unlimited',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8tvpetq6aebmcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62vk4c5t68qv6e9jpabb8dxuq4',
                  label: 'free-hours',
                  displayName: 'Free Hours',
                  displayValue: '2',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8ukpc8rp6y3be0t3gchtchq6ew35ehh6p8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'edu62vk4c5t68qv6e9jpabb9dngpe',
                  label: 'free-imagga-images',
                  displayName: 'Free Imagga Images',
                  displayValue: '100',
                },
              },
            ],
          },
          free: false,
          id: '2352cvkk4f3rp17pbgbrmffe1jcw8',
          label: 'standard',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pd9v64cb3f1nq0ck2c8wp8vk7e1jq8rkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62vk4c5t68qv9dngpetv15nmpu',
                  label: 'imagga-images',
                  displayName: 'Imagga Images',
                  numericDetails: { costTiers: [], unit: 'image' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61vpptk3chn72dkqerwp8x3bd9uq8cvecmwpew9renh6ct3j48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62vk4c5t68qvge9qp6tbkedmpw',
                  label: 'processing-duration',
                  displayName: 'Processing Duration',
                  numericDetails: {
                    costTiers: [{ cost: 790000000, limit: -1 }],
                    unit: 'hour',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1qcdup4d33dtrpmxbmc9jp6t3he0w7ark5cdvj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62vk4c5t68qvpd5j6avtdcnq66',
                  label: 'video-encoding',
                  displayName: 'Video Encoding',
                  numericDetails: {
                    costTiers: [{ cost: 38900000, limit: -1 }],
                    unit: 'minute',
                  },
                },
              },
            ],
          },
          regions: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69j78ttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 1700,
          displayName: 'Standard Plus Imagga',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6ht64tb3d1v70ukm6dpp8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'bandwidth',
                  displayName: 'Bandwidth',
                  displayValue: 'Unlimited',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8tvpetq6aebmcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'free-hours',
                  displayName: 'Free Hours',
                  displayValue: '2',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdvppdb3dnkk8ukpc8rp6y3be0t3gchtchq6ew35ehh6p8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'free-imagga-images',
                  displayName: 'Free Imagga Images',
                  displayValue: '100',
                },
              },
            ],
          },
          free: false,
          id: '2352ryw2hve7bw6qbc5018wa6kb3r',
          label: 'standard-plus-imagga',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pd9v64cb3f1nq0ck2c8wp8vk7e1jq8rkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'imagga-images',
                  displayName: 'Imagga Images',
                  numericDetails: {
                    costTiers: [{ cost: 10000000, limit: -1 }],
                    unit: 'image',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61vpptk3chn72dkqerwp8x3bd9uq8cvecmwpew9renh6ct3j48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'processing-duration',
                  displayName: 'Processing Duration',
                  numericDetails: {
                    costTiers: [{ cost: 790000000, limit: -1 }],
                    unit: 'hour',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1qcdup4d33dtrpmxbmc9jp6t3he0w7ark5cdvj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62vk4c5t68bbgdhuq6bb9dngpe',
                  label: 'video-encoding',
                  displayName: 'Video Encoding',
                  numericDetails: {
                    costTiers: [{ cost: 38900000, limit: -1 }],
                    unit: 'minute',
                  },
                },
              },
            ],
          },
          regions: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
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
    id: '2343d7p36xwrydjy7120jxqxc7t22',
    displayName: 'Blitline',
    label: 'blitline',
    logoUrl: 'https://cdn.manifold.co/providers/blitline/logos/blitline.png',
    supportEmail: 'support@blitline.com',
    url: '',
  },
  settings: { ssoSupported: true, credentialsSupport: ProductCredentialsSupportType.Single },
  setupStepsHtml: '',
  state: ProductState.New,
  supportEmail: 'support@blitline.com',
  tagline: 'Premium image processing and rasterization API for enterprise systems',
  tags: ['optimization'],
  termsUrl: 'http://www.blitline.com/terms',
  valueProps: [
    {
      header: 'Reduce Your Costs',
      body:
        'Blitline drastically reduces the amount of work you need to develop an application\nthat does any image processing. Stop rebuilding the same image processing functionality,\nlet us do it for much less than it would cost you to make and support it.\nPay for only the image processing time that your jobs use!\n',
    },
    {
      header: 'Broad spectrum functionality',
      body:
        'Need to process PDFs? Need to take screenshots of your website? Need HTML\nfor SEO? Want to run your own ImageMagick or other image processing scripts on\nour cloud? We do that!\n',
    },
    {
      header: 'Massively Scalable',
      body:
        'Instantly support thousands of concurrent image requests. Stop worrying about\nif you image processing is going to scale, we handle that for you, and we are\ngood at it. Blitline scales to let you manipulate hundreds of thousands images\nper hour, and millions per day.\n',
    },
    {
      header: 'S3/Azure Integration',
      body:
        'We can push stuff into your S3 bucket for you. We can even read stuff out\nof your buckets so that you don’t have to make you images public.\n',
    },
    {
      header: 'Excellent Support',
      body: 'Our customer support is top notch. Talk to developers, not support agents.',
    },
    {
      header: 'Flexibility',
      body:
        'Since we offer a language agnostic simple JSON API, you can do whatever you\nwant with Blitline from any language. You can manage your images with any language\nfrom Ruby to javascript. With our open and extensible API, you control the process,\nyou control you images, and you control your distribution. Since we operate strictly\nvia JSON, you are never locked in to using Blitline.\n',
    },
  ],
  valuePropsHtml:
    '<h3>Reduce Your Costs</h3><p>Blitline drastically reduces the amount of work you need to develop an application\nthat does any image processing. Stop rebuilding the same image processing functionality,\nlet us do it for much less than it would cost you to make and support it.\nPay for only the image processing time that your jobs use!\n</p><h3>Broad spectrum functionality</h3><p>Need to process PDFs? Need to take screenshots of your website? Need HTML\nfor SEO? Want to run your own ImageMagick or other image processing scripts on\nour cloud? We do that!\n</p><h3>Massively Scalable</h3><p>Instantly support thousands of concurrent image requests. Stop worrying about\nif you image processing is going to scale, we handle that for you, and we are\ngood at it. Blitline scales to let you manipulate hundreds of thousands images\nper hour, and millions per day.\n</p><h3>S3/Azure Integration</h3><p>We can push stuff into your S3 bucket for you. We can even read stuff out\nof your buckets so that you don’t have to make you images public.\n</p><h3>Excellent Support</h3><p>Our customer support is top notch. Talk to developers, not support agents.</p><h3>Flexibility</h3><p>Since we offer a language agnostic simple JSON API, you can do whatever you\nwant with Blitline from any language. You can manage your images with any language\nfrom Ruby to javascript. With our open and extensible API, you control the process,\nyou control you images, and you control your distribution. Since we operate strictly\nvia JSON, you are never locked in to using Blitline.\n</p>',
};

export default product;
