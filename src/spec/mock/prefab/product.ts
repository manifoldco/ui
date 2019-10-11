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
  categories: [{ label: 'utility', products: emptyProducts }],
  displayName: 'Prefab.cloud',
  documentationUrl: 'https://www.prefab.cloud/documentation/getting_started',
  id: '234j199gnaggg2qj6fvey2m3gw1nc',
  images: [
    'https://cdn.manifold.co/providers/prefab/screenshots/f7c125bc-6049-4b76-8f50-db594797f4fb.png',
    'https://cdn.manifold.co/providers/prefab/screenshots/36fde154-2e26-4447-9f08-72eae58d4f2b.png',
    'https://cdn.manifold.co/providers/prefab/screenshots/f31a0889-e1dc-4eca-a1a5-08e23abc2d86.png',
  ],
  label: 'prefab',
  logoUrl:
    'https://cdn.manifold.co/providers/prefab/logos/b0f0b014-4063-4588-bc65-1da31f3fc187.png',
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
          displayName: 'Free',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69w64d346nuk4c3b6dk66y3mcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ctt6at9d65fp2xb4d5u2uv3fcxtg0',
                  label: 'audit-logs',
                  displayName: 'Audit Logs',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr34c3detq6acbj6twqeuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ctt6at9d65fpavb1d5p2uwvne1r6y',
                  label: 'email-support',
                  displayName: 'Email Support',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdu64cb5d1uq2d3m74r66x3g6rt78xkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ctt6at9d65fpctb1ehuq4t9dctp62',
                  label: 'feature-flags',
                  displayName: 'Feature flags',
                  displayValue: 'Free',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6puv5d1kq0xvr64r62vkj6rw74rkdcdq78tt25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ctt6at9d65fpjvkkehgpwx1denr68',
                  label: 'instant-updates',
                  displayName: 'Instant Updates',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64d35dtrkce3jc9jpatv76gu74rhkchj6mw3qegtpp8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'ctt6at9d65fq4tb4enq68rbeegpp4',
                  label: 'redundant-backends',
                  displayName: 'Redundant Backends',
                  displayValue: 'No',
                },
              },
            ],
          },
          free: true,
          id: '235evenbjrg63pg9yh7u1hgccz7ay',
          label: 'free-1',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pe9up4t346nukcdkn6cup6t3ecwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ctt6at9d65fprubdd5u66u35cdng0',
                  label: 'limitcheck',
                  displayName: 'Limitcheck',
                  numericDetails: { costTiers: [], unit: 'check' },
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kc5hk2tt25gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 500,
          displayName: 'Side Project',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69w64d346nuk4c3b6dk66y3mcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucazc5up8',
                  label: 'audit-logs',
                  displayName: 'Audit Logs',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr34c3detq6acbj6twqeuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucazcnpp2',
                  label: 'email-support',
                  displayName: 'Email Support',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdu64cb5d1uq2d3m74r66x3g6rt78xkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucazctjp2',
                  label: 'feature-flags',
                  displayName: 'Feature flags',
                  displayValue: 'Free',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6puv5d1kq0xvr64r62vkj6rw74rkdcdq78tt25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucazd5q76',
                  label: 'instant-updates',
                  displayName: 'Instant Updates',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64d35dtrkce3jc9jpatv76gu74rhkchj6mw3qegtpp8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucaze9jp8',
                  label: 'redundant-backends',
                  displayName: 'Redundant Backends',
                  displayValue: 'No',
                },
              },
            ],
          },
          free: false,
          id: '235brbjf5u8fnzndkee3cyg4tad0a',
          label: 'side-project-1',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pe9up4t346nukcdkn6cup6t3ecwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edmp8t9de1t6yuk5cdu2ucazdhmpu',
                  label: 'limitcheck',
                  displayName: 'Limitcheck',
                  numericDetails: { costTiers: [{ cost: 5000, limit: -1 }], unit: 'check' },
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69jkjx1p61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 19900,
          displayName: 'Business',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69w64d346nuk4c3b6dk66y3mcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9uq6ubecntq6b9hbxgqat39egppr',
                  label: 'audit-logs',
                  displayName: 'Audit Logs',
                  displayValue: 'No',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr34c3detq6acbj6twqeuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'c9uq6ubecntq6b9hbxjpurb9dgpq6',
                  label: 'email-support',
                  displayName: 'Email Support',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdu64cb5d1uq2d3m74r66x3g6rt78xkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'c9uq6ubecntq6b9hbxk6arbment6a',
                  label: 'feature-flags',
                  displayName: 'Feature flags',
                  displayValue: 'Free',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6puv5d1kq0xvr64r62vkj6rw74rkdcdq78tt25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'c9uq6ubecntq6b9hbxmpwwvmc5q78',
                  label: 'instant-updates',
                  displayName: 'Instant Updates',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64d35dtrkce3jc9jpatv76gu74rhkchj6mw3qegtpp8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'c9uq6ubecntq6b9hbxt6at3ndtj62',
                  label: 'redundant-backends',
                  displayName: 'Redundant Backends',
                  displayValue: 'Yes',
                },
              },
            ],
          },
          free: false,
          id: '23556zydkr0vgh04bne0c2q9ww5kj',
          label: 'business-1',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pe9up4t346nukcdkn6cup6t3ecwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9uq6ubecntq6b9hbxp6jvb9ehhpg',
                  label: 'limitcheck',
                  displayName: 'Limitcheck',
                  numericDetails: { costTiers: [{ cost: 5000, limit: -1 }], unit: 'check' },
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k71jkjx1p61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 49900,
          displayName: 'Enterprise',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69w64d346nuk4c3b6dk66y3mcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnyrbnchmq8',
                  label: 'audit-logs',
                  displayName: 'Audit Logs',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5v64cb46nr34c3detq6acbj6twqeuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnytbdc5mpr',
                  label: 'email-support',
                  displayName: 'Email Support',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcdu64cb5d1uq2d3m74r66x3g6rt78xkb48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnytk5c5u7a',
                  label: 'feature-flags',
                  displayName: 'Feature flags',
                  displayValue: 'Free',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1md9v6puv5d1kq0xvr64r62vkj6rw74rkdcdq78tt25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnyubeedu62',
                  label: 'instant-updates',
                  displayName: 'Instant Updates',
                  displayValue: 'Yes',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hu64d35dtrkce3jc9jpatv76gu74rhkchj6mw3qegtpp8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnywk5chupw',
                  label: 'redundant-backends',
                  displayName: 'Redundant Backends',
                  displayValue: 'Yes',
                },
              },
            ],
          },
          free: false,
          id: '2356g9e9ntw0erfwadd59a8md45mu',
          label: 'enterprise-1',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pe9up4t346nukcdkn6cup6t3ecwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv55mrnyv39dnmq8',
                  label: 'limitcheck',
                  displayName: 'Limitcheck',
                  numericDetails: { costTiers: [{ cost: 2000, limit: -1 }], unit: 'check' },
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
    id: '2340cfzebyhmuhemk5qubj0w3zvz4',
    displayName: 'Prefab',
    label: 'prefab',
    logoUrl: 'https://cdn.manifold.co/providers/prefab/logos/126x126.png',
    supportEmail: 'hello@prefab.cloud',
    url: '',
  },
  settings: { ssoSupported: true, credentialsSupport: ProductCredentialsSupportType.Single },
  setupStepsHtml: '',
  state: ProductState.New,
  supportEmail: 'hello@prefab.cloud',
  tagline: 'Feature Flags, RateLimits & RemoteConfig. Microservices as a Service.',
  termsUrl: 'https://www.prefab.cloud/terms_of_service',
  valueProps: [
    {
      header: 'Rate Limits',
      body:
        "Fast, efficient, bombproof and cost-effective rate limiting libraries that don't require any Redis/Memcached on your end.",
    },
    {
      header: 'Feature Flags',
      body:
        "Don't leave home without them. Feature flags enable Moving Fast and Breaking Less. Our flags can be: on, off, on for a percentage of your traffic and on for specific users or users that match specific criteria.",
    },
    {
      header: 'Distributed/Remote Config',
      body:
        'Want a reliable distributed config like Consul / Zookeeper that works out of the box and is cost-effective?',
    },
    {
      header: 'Deduplication',
      body:
        "Only want to send the 'Welcome Email' once per person, but have some nasty race conditions that could lead to doing it twice? Put an eternal semaphore for 'welcome-email:bob@example.com' and let us store that forever. Easy idempotency as a service.",
    },
    {
      header: 'Scales to millions of individual limits',
      body:
        "Paying your usage tracking service by the event? Do you really need to send an event for Bob _every_ time he clicks? How about only sending bob's unique events every 5 minutes? Let's decimate that bill.",
    },
    {
      header: 'Batteries Included',
      body:
        'Open source libraries included for Node, Ruby, Java & C#. gRPC provides robust extensible support for other languages.',
    },
  ],
  valuePropsHtml:
    '<h3>Rate Limits</h3><p>Fast, efficient, bombproof and cost-effective rate limiting libraries that don&#39;t require any Redis/Memcached on your end.</p><h3>Feature Flags</h3><p>Don&#39;t leave home without them. Feature flags enable Moving Fast and Breaking Less. Our flags can be: on, off, on for a percentage of your traffic and on for specific users or users that match specific criteria.</p><h3>Distributed/Remote Config</h3><p>Want a reliable distributed config like Consul / Zookeeper that works out of the box and is cost-effective?</p><h3>Deduplication</h3><p>Only want to send the &#39;Welcome Email&#39; once per person, but have some nasty race conditions that could lead to doing it twice? Put an eternal semaphore for &#39;welcome-email:bob@example.com&#39; and let us store that forever. Easy idempotency as a service.</p><h3>Scales to millions of individual limits</h3><p>Paying your usage tracking service by the event? Do you really need to send an event for Bob _every_ time he clicks? How about only sending bob&#39;s unique events every 5 minutes? Let&#39;s decimate that bill.</p><h3>Batteries Included</h3><p>Open source libraries included for Node, Ruby, Java &amp; C#. gRPC provides robust extensible support for other languages.</p>',
};

export default product;
