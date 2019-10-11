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
  categories: [{ label: 'optimization', products: emptyProducts }],
  displayName: 'Generic Image Tagging',
  documentationUrl: 'https://www.ximilar.com/services/generic-tagging/',
  id: '234hyjj2qbkpyw4z0g0bwgjgtydnj',
  images: [
    'https://cdn.manifold.co/providers/ximilar/screenshots/39d5a682-8532-405d-952b-c9b58f787fa2.png',
  ],
  label: 'generic-tagging',
  logoUrl:
    'https://cdn.manifold.co/providers/ximilar/logos/9ef978f9-309e-4e0b-a9d8-ee99b78a4ac3.png',
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
          displayName: 'Pay-as-you-go',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61t64uk36nr3cwkmc9hk8cbj6wu7cxhkcdq78w9penh6arvqcwv7jx3861jkjukh69w64db5chukedh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1gqjbb1ecpqjvvn5nkpyqvgc5t62',
                  label: 'parallel-processing-requests',
                  displayName: 'Parallel processing of requests',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64tv565rq2d3r60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1gqjbb1ecpqjvvn5nkpyqvkenr70',
                  label: 'support',
                  displayName: 'Support',
                  displayValue: 'Standard',
                },
              },
            ],
          },
          free: false,
          id: '235bfvhd62njf68whzkcd75471mvw',
          label: 'pay-as-you-go',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64u35dtn72dkr60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1gqjbb1ecpqjvvn5nkpyqvjcnrqa',
                  label: 'request',
                  displayName: 'Requests',
                  numericDetails: {
                    costTiers: [{ cost: 950000, limit: -1 }],
                    unit: 'request',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 0,
          displayName: 'Free',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61t64uk36nr3cwkmc9hk8cbj6wu7cxhkcdq78w9penh6arvqcwv7jx3861jkjukh69w64db5chukedh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ctt6ataze1gq4rbcdhjprbbge9qp6',
                  label: 'parallel-processing-requests',
                  displayName: 'Parallel processing of requests',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64u35dtn72dkr6dnk8cbj6tgqeu1gchq72w3qf0tkg8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'ctt6ataze9jq2xb5edu76bbddxq78',
                  label: 'requests-month',
                  displayName: 'Requests per month',
                  displayValue: '5000',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64tv565rq2d3r60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ctt6atazeduq0w3fe9u0000000000',
                  label: 'support',
                  displayName: 'Support',
                  displayValue: 'Limited Email',
                },
              },
            ],
          },
          free: true,
          id: '2350zxghrv2a36pd7q5h1yzdfkwxr',
          label: 'free',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kc5jkjttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 5900,
          displayName: 'Business',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61t64uk36nr3cwkmc9hk8cbj6wu7cxhkcdq78w9penh6arvqcwv7jx3861jkjukh69w64db5chukedh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'c9uq6ubecntq6qvgc5t62v3ccnp2u',
                  label: 'parallel-processing-requests',
                  displayName: 'Parallel processing of requests',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64u35dtn72dkr6dnk8cbj6tgqeu1gchq72w3qf0tkg8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'c9uq6ubecntq6qvjcnrqatbkehtju',
                  label: 'requests-month',
                  displayName: 'Requests per month',
                  displayValue: '100000',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64tv565rq2d3r60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9uq6ubecntq6qvkenr70vvjeg000',
                  label: 'support',
                  displayName: 'Support',
                  displayValue: 'Standard',
                },
              },
            ],
          },
          free: false,
          id: '2356jercp7yx5164wdw55mpxzw6yj',
          label: 'business',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k71jkjx1p61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 49900,
          displayName: 'Professional',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n61t64uk36nr3cwkmc9hk8cbj6wu7cxhkcdq78w9penh6arvqcwv7jx3861jkjukh69w64db5chukedh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1t6ytk5edtpjvvec5p5yw31e9gpr',
                  label: 'parallel-processing-requests',
                  displayName: 'Parallel processing of requests',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64u35dtn72dkr6dnk8cbj6tgqeu1gchq72w3qf0tkg8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'e1t6ytk5edtpjvvec5p5ywk5e5upa',
                  label: 'requests-month',
                  displayName: 'Requests per month',
                  displayValue: '1000000',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64tv565rq2d3r60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6ytk5edtpjvvec5p5ywvne1r6y',
                  label: 'support',
                  displayName: 'Support',
                  displayValue: 'Priority',
                },
              },
            ],
          },
          free: false,
          id: '2352nnegddbxg12duwbbrbtkeymw8',
          label: 'professional',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
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
    id: '2342x6jwx1xrqcnfe6nn2n89c2fc8',
    displayName: 'Ximilar',
    label: 'ximilar',
    logoUrl: 'https://cdn.manifold.co/providers/vize/logos/280x280.png',
    supportEmail: 'help@ximilar.com',
    url: '',
  },
  settings: { ssoSupported: false, credentialsSupport: ProductCredentialsSupportType.Single },
  setupStepsHtml: '',
  state: ProductState.Available,
  supportEmail: 'tech@ximilar.com',
  tagline:
    'Automatic tagging of everyday photos. Powerful computer vision & machine learning with blazing speed.',
  termsUrl: 'https://www.ximilar.com/terms-of-use-privacy/',
  valueProps: [
    {
      header: 'We Spot Everything',
      body: 'The service can recognises 1,000 concepts in your everyday photos.',
    },
    {
      header: 'Ready To Use',
      body: 'You do not have to train anything, the service is ready for you.',
    },
    {
      header: 'Swift & Scalable',
      body: 'Performance is a key - image analysis is quick and can be processed in batches.',
    },
  ],
  valuePropsHtml:
    '<h3>We Spot Everything</h3><p>The service can recognises 1,000 concepts in your everyday photos.</p><h3>Ready To Use</h3><p>You do not have to train anything, the service is ready for you.</p><h3>Swift &amp; Scalable</h3><p>Performance is a key - image analysis is quick and can be processed in batches.</p>',
};

export default product;
