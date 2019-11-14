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

// https://graphqlbin.com/v2/gnyDs
const product: Product = {
  categories: [
    {
      displayName: 'Database',
      id: '00000000000000000000000000000',
      label: 'database',
      products: emptyProducts,
    },
  ],
  displayName: 'Aiven Cassandra',
  documentationUrl: 'https://help.aiven.io/cassandra',
  id: '234qqazjcy9xm55tf0xner1nrb2tj',
  images: [],
  label: 'aiven-cassandra',
  logoUrl: 'https://cdn.manifold.co/providers/aiven/logos/73be9a5e-dbd4-465e-a16c-4a24d0a86293.png',
  plans: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k71j3jttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 45000,
          displayName: 'Startup 4',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tpk4vk5cdkkec3mc9n38cb26huj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmenr2ud2zcdr7awtde1jq4',
                  label: 'cpus-per-vm',
                  displayName: 'CPUs per VM',
                  displayValue: '1 CPU',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m71up4uv4cdkkedkq6crp6t3acwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmenr2ud2zchmq6utdedr62',
                  label: 'disk-space',
                  displayName: 'Disk space',
                  displayValue: '450 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t1m65t3crbqd0r62x1pcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmenr2ud2ze9gpubbgcnt2u',
                  label: 'ram-per-vm',
                  displayName: 'RAM per VM',
                  displayValue: '4 GB',
                },
              },
            ],
          },
          free: false,
          id: '235dyg27zey1rwhuw4yd5679bdk1a',
          label: 'startup-4',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr74uhgc4t6adbjcwup6xb2d9hqgvbgexup4c9n6gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr78chgc4t6ct1hdnr7jr9r48p24vvjchjq48hufdyqu',
                node: {
                  id: '235krnd90mb51mu21rgf634vyyvnw',
                  platform: 'aws',
                  dataCenter: 'us-east-2',
                  displayName: 'AWS - US East 2 (Ohio)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr74uhgc4t6adbjcwu3cwk2cdj3autpf5vpptb46nkpmuh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235nu2c0z73hq1f9qby444nnnq1fu',
                  platform: 'aws',
                  dataCenter: 'us-west-1',
                  displayName: 'AWS - US West 1 (N. California)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr78chgc4t6ct9td9r6axkpcmuk88hc49qq4t35e8h3myvxfm',
                node: {
                  id: '235t4e0xt86hrgefbvyzh6f5dr7n4',
                  platform: 'aws',
                  dataCenter: 'us-west-2',
                  displayName: 'AWS - US West 2 (Oregon)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h65r62xkbdnjkjtvge8w32u125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235p16bz8n7qkjtvqyg599qtqa9ur',
                  platform: 'gcp',
                  dataCenter: 'us-central-1',
                  displayName: 'Google Cloud - US  Central 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235wy26njfzf53k1d050k2eg9f5ey',
                  platform: 'gcp',
                  dataCenter: 'us-east-1',
                  displayName: 'Google Cloud - US  East 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30x9g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235u7nm47cknwjyjdyqwxg070zfmm',
                  platform: 'gcp',
                  dataCenter: 'us-east-4',
                  displayName: 'Google Cloud - US  East 4',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235uxnm8fnf6d2wbzthz60e347rje',
                  platform: 'gcp',
                  dataCenter: 'us-west-1',
                  displayName: 'Google Cloud - US  West 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30x1g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235gpteq8z5tfk76f8vxhft8b2yap',
                  platform: 'gcp',
                  dataCenter: 'us-west-2',
                  displayName: 'Google Cloud - US  West 2',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kd9j32ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 94000,
          displayName: 'Startup 8',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tpk4vk5cdkkec3mc9n38cb26huj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmenr2ue2zcdr7awtde1jq4',
                  label: 'cpus-per-vm',
                  displayName: 'CPUs per VM',
                  displayValue: '2 CPU',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m71up4uv4cdkkedkq6crp6t3acwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmenr2ue2zchmq6utdedr62',
                  label: 'disk-space',
                  displayName: 'Disk space',
                  displayValue: '900 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t1m65t3crbqd0r62x1pcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmenr2ue2ze9gpubbgcnt2u',
                  label: 'ram-per-vm',
                  displayName: 'RAM per VM',
                  displayValue: '8 GB',
                },
              },
            ],
          },
          free: false,
          id: '235ay4w1mgfuzp6hxy1gref41r7ba',
          label: 'startup-8',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr74uhgc4t6adbjcwup6xb2d9hqgvbgexup4c9n6gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr78chgc4t6ct1hdnr7jr9r48p24vvjchjq48hufdyqu',
                node: {
                  id: '235krnd90mb51mu21rgf634vyyvnw',
                  platform: 'aws',
                  dataCenter: 'us-east-2',
                  displayName: 'AWS - US East 2 (Ohio)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr74uhgc4t6adbjcwu3cwk2cdj3autpf5vpptb46nkpmuh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235nu2c0z73hq1f9qby444nnnq1fu',
                  platform: 'aws',
                  dataCenter: 'us-west-1',
                  displayName: 'AWS - US West 1 (N. California)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr78chgc4t6ct9td9r6axkpcmuk88hc49qq4t35e8h3myvxfm',
                node: {
                  id: '235t4e0xt86hrgefbvyzh6f5dr7n4',
                  platform: 'aws',
                  dataCenter: 'us-west-2',
                  displayName: 'AWS - US West 2 (Oregon)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h65r62xkbdnjkjtvge8w32u125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235p16bz8n7qkjtvqyg599qtqa9ur',
                  platform: 'gcp',
                  dataCenter: 'us-central-1',
                  displayName: 'Google Cloud - US  Central 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235wy26njfzf53k1d050k2eg9f5ey',
                  platform: 'gcp',
                  dataCenter: 'us-east-1',
                  displayName: 'Google Cloud - US  East 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30x9g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235u7nm47cknwjyjdyqwxg070zfmm',
                  platform: 'gcp',
                  dataCenter: 'us-east-4',
                  displayName: 'Google Cloud - US  East 4',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235uxnm8fnf6d2wbzthz60e347rje',
                  platform: 'gcp',
                  dataCenter: 'us-west-1',
                  displayName: 'Google Cloud - US  West 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30x1g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235gpteq8z5tfk76f8vxhft8b2yap',
                  platform: 'gcp',
                  dataCenter: 'us-west-2',
                  displayName: 'Google Cloud - US  West 2',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69j32v9p61t36c125gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 144000,
          displayName: 'Business 16',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tpk4vk5cdkkec3mc9n38cb26huj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'c9uq6ubecntq6b9h6tfp6w3necpq0',
                  label: 'cpus-per-vm',
                  displayName: 'CPUs per VM',
                  displayValue: '2 CPU',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m71up4uv4cdkkedkq6crp6t3acwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9uq6ubecntq6b9h6tfp8ubkdcpq6',
                  label: 'disk-space',
                  displayName: 'Disk space',
                  displayValue: '1320 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t1m65t3crbqd0r62x1pcwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9uq6ubecntq6b9h6tfq4rbd5nr6a',
                  label: 'ram-per-vm',
                  displayName: 'RAM per VM',
                  displayValue: '15 GB',
                },
              },
            ],
          },
          free: false,
          id: '2355hnm97ppy5cb0keb64ft7zq426',
          label: 'business-16',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr74uhgc4t6adbjcwup6xb2d9hqgvbgexup4c9n6gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8c9je0t7exkd6gr78chgc4t6ct1hdnr7jr9r48p24vvjchjq48hufdyqu',
                node: {
                  id: '235krnd90mb51mu21rgf634vyyvnw',
                  platform: 'aws',
                  dataCenter: 'us-east-2',
                  displayName: 'AWS - US East 2 (Ohio)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr74uhgc4t6adbjcwu3cwk2cdj3autpf5vpptb46nkpmuh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235nu2c0z73hq1f9qby444nnnq1fu',
                  platform: 'aws',
                  dataCenter: 'us-west-1',
                  displayName: 'AWS - US West 1 (N. California)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m69q7autm61r6mc3ec5nk8cb2e1gqexkd6gr78chgc4t6ct9td9r6axkpcmuk88hc49qq4t35e8h3myvxfm',
                node: {
                  id: '235t4e0xt86hrgefbvyzh6f5dr7n4',
                  platform: 'aws',
                  dataCenter: 'us-west-2',
                  displayName: 'AWS - US West 2 (Oregon)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h65r62xkbdnjkjtvge8w32u125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: '235p16bz8n7qkjtvqyg599qtqa9ur',
                  platform: 'gcp',
                  dataCenter: 'us-central-1',
                  displayName: 'Google Cloud - US  Central 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235wy26njfzf53k1d050k2eg9f5ey',
                  platform: 'gcp',
                  dataCenter: 'us-east-1',
                  displayName: 'Google Cloud - US  East 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1h69r34xvpdmu30x9g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235u7nm47cknwjyjdyqwxg070zfmm',
                  platform: 'gcp',
                  dataCenter: 'us-east-4',
                  displayName: 'Google Cloud - US  East 4',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30wk748p24vvjchjq48hufdyqu',
                node: {
                  id: '235uxnm8fnf6d2wbzthz60e347rje',
                  platform: 'gcp',
                  dataCenter: 'us-west-1',
                  displayName: 'Google Cloud - US  West 1',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcnv7ctk3f1r3cr9r68tp8u3he5gq8c9g6nppedb1dnu30d1hc9r62xvpdmu30x1g48p24vvjchjq48hufdyqu',
                node: {
                  id: '235gpteq8z5tfk76f8vxhft8b2yap',
                  platform: 'gcp',
                  dataCenter: 'us-west-2',
                  displayName: 'Google Cloud - US  West 2',
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
    id: '2341k8ga6p3d9qv3t42vmcjkb6kqe',
    displayName: 'Aiven',
    label: 'aiven',
    logoUrl:
      'https://cdn.manifold.co.s3.amazonaws.com/providers/aiven/logos/aiven-logo_vert_RGB.png',
    supportEmail: 'support@aiven.io',
    url: '',
  },
  settings: {
    ssoSupported: false,
    credentialsSupport: ProductCredentialsSupportType.Single,
  },
  setupStepsHtml: '',
  state: ProductState.New,
  supportEmail: 'support-manifold@aiven.io',
  tagline: 'The most complete cloud Cassandra on the market',
  tags: ['database'],
  termsUrl: 'https://aiven.io/terms',
  valueProps: [
    {
      header: 'Bullet proof multi-node clusters',
      body:
        "If you have two nodes, you've got flexibility and some built-in resilience. What's better than two? Three...especially when they're spread across availability zones. Ours are and we think that's pretty bullet proof.",
    },
    {
      header: '365 backups per year',
      body:
        "Even with the best team and partner, databases are finicky. That is why you need to be able to recover your data, especially if you're running in production. You can do this with Aiven Cassandra, every day of every year.",
    },
    {
      header: 'Full-spectrum security',
      body:
        "If your data isn't secure, nothing else matters. All services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.",
    },
  ],
  valuePropsHtml:
    '<h3>Bullet proof multi-node clusters</h3><p>If you have two nodes, you&#39;ve got flexibility and some built-in resilience. What&#39;s better than two? Three...especially when they&#39;re spread across availability zones. Ours are and we think that&#39;s pretty bullet proof.</p><h3>365 backups per year</h3><p>Even with the best team and partner, databases are finicky. That is why you need to be able to recover your data, especially if you&#39;re running in production. You can do this with Aiven Cassandra, every day of every year.</p><h3>Full-spectrum security</h3><p>If your data isn&#39;t secure, nothing else matters. All services run on dedicated VMs instead of multi-tenant ones most providers use. Your data is encrypted in transit and at rest, and our automation takes care of all security updates.</p>',
};

export default product;
