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
  displayName: 'Ziggeo',
  documentationUrl: 'https://ziggeo.com/docs',
  id: '234yycr3mf5f2hrw045vuxeatnd50',
  images: [
    'https://cdn.manifold.co/providers/ziggeo/screenshots/1-instagram-like-effects.png',
    'https://cdn.manifold.co/providers/ziggeo/screenshots/3-video-analysis.jpg',
    'https://cdn.manifold.co/providers/ziggeo/screenshots/4-video-player-themes.png',
    'https://cdn.manifold.co/providers/ziggeo/screenshots/5-video-profiles.png',
    'https://cdn.manifold.co/providers/ziggeo/screenshots/6-video-recorder-themes.png',
  ],
  label: 'ziggeo',
  logoUrl: 'https://cdn.manifold.co/providers/ziggeo/logos/ziggeo.png',
  plans: {
    pageInfo: { hasNextPage: false, hasPreviousPage: false },
    edges: [
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kd9jkjttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 9900,
          displayName: 'Starter',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tvppd1m64w3cckqddppcd376hn7cuvdcdq6pw9me9h6ut1ne5r7exvj48p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62wkmcnt5ycvjcgpq0rbjehwju',
                  label: '3rd-party-integrations',
                  displayName: '3rd Party Integrations',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5t64uv66hkkadkn6crpaebacwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5ytb1edwjuwv8c5t6a',
                  label: 'easy-share',
                  displayName: 'Easy Share',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mexv7cv9m61r6mc3derrp6x3ad8r78uv6cmw6edb5etv6mt33cwu3gx32dnhpwu3h71up4tk4e8h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5yvkkctvjut35ehjp6',
                  label: 'nsfw-detection',
                  displayName: 'Not - Safe for Work Detection',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mf5v6gc1rehr3euhr69ppaeb7e1vqexhkchw6mdkaetnke8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'edu62wkmcnt5yvve5nu6gt9dctp7j',
                  label: 'on-the-fly-transcoding',
                  displayName: 'On Fly Transcoding',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tt7cuk3dtn70xtr68tp6dbj6ww7grkacdpj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmcnt5ywv3e9jpavhdcdgq0',
                  label: 'screen-capture',
                  displayName: 'Screen Capture',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cv5dtu3cr9r69r68dba6tgqcx1g70upgw1pehh6ptb348p24vvjchjq48hufdyqu',
                node: {
                  id: 'edu62wkmcnt5ywv5cduq4t9detmp8',
                  label: 'secure-video-access',
                  displayName: 'Secure Video Access',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64chm64r70dkjetk6avkh6ww7ewh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edu62wkmcnt5ywvnc8pp2rv3dxupw',
                  label: 'sub-accounts',
                  displayName: 'Sub Accounts',
                  displayValue: 'None',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncdup4d33dtrpmc3d6dn68y3b6tn7cctncnhj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmcnt5yxk9chjpybbge9qpc',
                  label: 'video-profiles',
                  displayName: 'Video Profiles',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncnu64ck465rq0ybnetnj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmcnt5yxv5c9m6yvvbec000',
                  label: 'webhooks',
                  displayName: 'Webhooks',
                  displayValue: 'true',
                },
              },
            ],
          },
          free: false,
          id: '235cmwdqp4rrugzmkpy1r4e1wf88m',
          label: 'starter',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1p69v6pcb4d1vq2dknc9nj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'edu62wkmcnt5yrbec5p7jwv9ec000',
                  label: 'analysis',
                  displayName: 'A.I. Video Analysis',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5ytb6ctjp6x3kbxm68',
                  label: 'effects_hd',
                  displayName: 'Video Effects - HD',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5ytb6ctjp6x3kbxtp8',
                  label: 'effects_sd',
                  displayName: 'Video Effects - SD',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5yw3cc5wpjvk7bxm68',
                  label: 'playing_hd',
                  displayName: 'Video Player - HD',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5yw3cc5wpjvk7bxtp8',
                  label: 'playing_sd',
                  displayName: 'Video Player - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 1014000 },
                      { cost: 11667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e1kq8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edu62wkmcnt5ywk5cdqq4t39dtkny',
                  label: 'recording_hd',
                  displayName: 'Video Recorder - HD',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e4v78c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'edu62wkmcnt5ywk5cdqq4t39dtkny',
                  label: 'recording_sd',
                  displayName: 'Video Recorder - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 202680 },
                      { cost: 300000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5ywvmdxt62tv5bxm68',
                  label: 'storage_hd',
                  displayName: 'Video Storage - HD',
                  numericDetails: { costTiers: [], unit: 'Seconds' },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'edu62wkmcnt5ywvmdxt62tv5bxtp8',
                  label: 'storage_sd',
                  displayName: 'Video Storage - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 1216560 },
                      { cost: 21667, limit: -1 },
                    ],
                    unit: 'Seconds',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tjkjx1p61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 39900,
          displayName: 'Pro',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tvppd1m64w3cckqddppcd376hn7cuvdcdq6pw9me9h6ut1ne5r7exvj48p24vvjchjq48hufdyqu',
                node: {
                  id: 'e1t6yqtke9j2uw31e9u7jbb9dtu6a',
                  label: '3rd-party-integrations',
                  displayName: '3rd Party Integrations',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5t64uv66hkkadkn6crpaebacwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqv5c5tqjbbkd1gq4t8000000',
                  label: 'easy-share',
                  displayName: 'Easy Share',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mexv7cv9m61r6mc3derrp6x3ad8r78uv6cmw6edb5etv6mt33cwu3gx32dnhpwu3h71up4tk4e8h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqveedk7ebb4cnu6arvmd5qpw',
                  label: 'nsfw-detection',
                  displayName: 'Not - Safe for Work Detection',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mf5v6gc1rehr3euhr69ppaeb7e1vqexhkchw6mdkaetnke8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'e1t6yqvfdrpq8u355nk6ry9deht62',
                  label: 'on-the-fly-transcoding',
                  displayName: 'On Fly Transcoding',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tt7cuk3dtn70xtr68tp6dbj6ww7grkacdpj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'e1t6yqvkcdt6atbe5nhp2w3ment6a',
                  label: 'screen-capture',
                  displayName: 'Screen Capture',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cv5dtu3cr9r69r68dba6tgqcx1g70upgw1pehh6ptb348p24vvjchjq48hufdyqu',
                node: {
                  id: 'e1t6yqvkcnhqawk55nv6jt35dwpp2',
                  label: 'secure-video-access',
                  displayName: 'Secure Video Access',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64chm64r70dkjetk6avkh6ww7ewh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1t6yqvkenh2urb3cdqqavkmec000',
                  label: 'sub-accounts',
                  displayName: 'Sub Accounts',
                  displayValue: 'Up to 5 shared apps only',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncdup4d33dtrpmc3d6dn68y3b6tn7cctncnhj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'e1t6yqvpd5j6avtde1t6ytk9dhjq6',
                  label: 'video-profiles',
                  displayName: 'Video Profiles',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncnu64ck465rq0ybnetnj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'e1t6yqvqcnh6gvvfddtg000000000',
                  label: 'webhooks',
                  displayName: 'Webhooks',
                  displayValue: 'true',
                },
              },
            ],
          },
          free: false,
          id: '2356yy3bu9e2n60f0be9wxjf1xak4',
          label: 'pro',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1p69v6pcb4d1vq2dknc9nj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'e1t6yqv1dtgprybkd5tg000000000',
                  label: 'analysis',
                  displayName: 'A.I. Video Analysis',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 230640 },
                      { cost: 416667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqv5ctk6arvmedfpgt0000000',
                  label: 'effects_hd',
                  displayName: 'Video Effects - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 135000 },
                      { cost: 666667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqv5ctk6arvmedfq6t0000000',
                  label: 'effects_sd',
                  displayName: 'Video Effects - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 191280 },
                      { cost: 333334, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqvgdhgqjubecxfpgt0000000',
                  label: 'playing_hd',
                  displayName: 'Video Player - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 750000 },
                      { cost: 13334, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqvgdhgqjubecxfq6t0000000',
                  label: 'playing_sd',
                  displayName: 'Video Player - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 807000 },
                      { cost: 6667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e1kq8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1t6yqvjcnhpywk4d5q6eqv8cg000',
                  label: 'recording_hd',
                  displayName: 'Video Recorder - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 125640 },
                      { cost: 400000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e4v78c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'e1t6yqvjcnhpywk4d5q6eqvkcg000',
                  label: 'recording_sd',
                  displayName: 'Video Recorder - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 210000 },
                      { cost: 200000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqvkehqq4rb7cnfpgt0000000',
                  label: 'storage_hd',
                  displayName: 'Video Storage - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 717300 },
                      { cost: 30000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'e1t6yqvkehqq4rb7cnfq6t0000000',
                  label: 'storage_sd',
                  displayName: 'Video Storage - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 1333320 },
                      { cost: 15000, limit: -1 },
                    ],
                    unit: 'Seconds',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kd9jkjx1p61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [],
          },
          cost: 99900,
          displayName: 'Enterprise',
          fixedFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tvppd1m64w3cckqddppcd376hn7cuvdcdq6pw9me9h6ut1ne5r7exvj48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cnq78tbje1t6jwv5bwtq4t1de1gq4',
                  label: '3rd-party-integrations',
                  displayName: '3rd Party Integrations',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mc5t64uv66hkkadkn6crpaebacwh2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxjp2wvt5ntpg',
                  label: 'easy-share',
                  displayName: 'Easy Share',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mexv7cv9m61r6mc3derrp6x3ad8r78uv6cmw6edb5etv6mt33cwu3gx32dnhpwu3h71up4tk4e8h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxq76tkq5nj6a',
                  label: 'nsfw-detection',
                  displayName: 'Not - Safe for Work Detection',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mf5v6gc1rehr3euhr69ppaeb7e1vqexhkchw6mdkaetnke8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'cnq78tbje1t6jwv5bxqpwbbmd1jju',
                  label: 'on-the-fly-transcoding',
                  displayName: 'On Fly Transcoding',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tt7cuk3dtn70xtr68tp6dbj6ww7grkacdpj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'cnq78tbje1t6jwv5bxtp6wk5cnq2u',
                  label: 'screen-capture',
                  displayName: 'Screen Capture',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cv5dtu3cr9r69r68dba6tgqcx1g70upgw1pehh6ptb348p24vvjchjq48hufdyqu',
                node: {
                  id: 'cnq78tbje1t6jwv5bxtparvne9jju',
                  label: 'secure-video-access',
                  displayName: 'Secure Video Access',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw64chm64r70dkjetk6avkh6ww7ewh25gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'cnq78tbje1t6jwv5bxtqarhdc5hp6',
                  label: 'sub-accounts',
                  displayName: 'Sub Accounts',
                  displayValue: 'Unlimited',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncdup4d33dtrpmc3d6dn68y3b6tn7cctncnhj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'cnq78tbje1t6jwv5bxv6jt35dwpq0',
                  label: 'video-profiles',
                  displayName: 'Video Profiles',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1ncnu64ck465rq0ybnetnj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'cnq78tbje1t6jwv5bxvpark8dxqpp',
                  label: 'webhooks',
                  displayName: 'Webhooks',
                  displayValue: 'true',
                },
              },
            ],
          },
          free: false,
          id: '235f9mmmc7qg4h5zzg8mrqxer5acp',
          label: 'enterprise',
          meteredFeatures: {
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1p69v6pcb4d1vq2dknc9nj4b12dxt68tbj48x7pzbx',
                node: {
                  id: 'cnq78tbje1t6jwv5bxgpwrbcf5tpj',
                  label: 'analysis',
                  displayName: 'A.I. Video Analysis',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 755880 },
                      { cost: 333334, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxjpctk5cdu76',
                  label: 'effects_hd',
                  displayName: 'Video Effects - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 499980 },
                      { cost: 500000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pc5u6pdk3dtm72e3qenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxjpctk5cdu76',
                  label: 'effects_sd',
                  displayName: 'Video Effects - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 511740 },
                      { cost: 250000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxr6rrbtd5q6e',
                  label: 'playing_hd',
                  displayName: 'Video Player - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 2064840 },
                      { cost: 11667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q61v36cb66npq0xvmenx6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxr6rrbtd5q6e',
                  label: 'playing_sd',
                  displayName: 'Video Player - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 3000000 },
                      { cost: 6667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e1kq8c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'cnq78tbje1t6jwv5bxt6arvfe9j6j',
                  label: 'recording_hd',
                  displayName: 'Video Recorder - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 422520 },
                      { cost: 300000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64cv4f1u3ce3nc9jp6y36e4v78c125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'cnq78tbje1t6jwv5bxt6arvfe9j6j',
                  label: 'recording_sd',
                  displayName: 'Video Recorder - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 666660 },
                      { cost: 150000, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x68cba60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxtq8vvjc5kpa',
                  label: 'storage_hd',
                  displayName: 'Video Storage - HD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 3150420 },
                      { cost: 21667, limit: -1 },
                    ],
                    unit: 'Seconds',
                  },
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbmc5x6at3a60h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'cnq78tbje1t6jwv5bxtq8vvjc5kpa',
                  label: 'storage_sd',
                  displayName: 'Video Storage - SD',
                  numericDetails: {
                    costTiers: [
                      { cost: 0, limit: 3000000 },
                      { cost: 10000, limit: -1 },
                    ],
                    unit: 'Seconds',
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
    id: '234a33rd2pxfzq9qfk0v5qdrykhcp',
    displayName: 'Ziggeo',
    label: 'ziggeo',
    logoUrl: 'https://cdn.manifold.co/providers/ziggeo/logos/ziggeo.png',
    supportEmail: 'support@ziggeo.com',
    url: '',
  },
  settings: { ssoSupported: true, credentialsSupport: ProductCredentialsSupportType.Single },
  setupStepsHtml: '',
  state: ProductState.Available,
  supportEmail: 'support@ziggeo.com',
  tagline:
    'Ziggeo is an award-winning cloud-based service for in-browser/in-app video recording, playback, transcoding, storage & video management.',
  tags: ['optimization'],
  termsUrl: 'https://ziggeo.com/terms',
  valueProps: [
    {
      header: 'Video Recorder',
      body:
        'Records + uploads videos from any device/browser. Supports HTML-5 / WebRTC. Mobile-friendly, responsive, and fully customizable.',
    },
    {
      header: 'Video Transcoder',
      body:
        'Automatically transcodes to all desired resolutions. No complicated settings. Highly customizable. Includes video uploader.',
    },
    {
      header: 'Video Player',
      body:
        'Plays videos across all devices/browsers. Is responsive, embeddable, and fully customizable. Comes with several predefined themes.',
    },
    {
      header: 'Video SDKs',
      body:
        'Native mobile SDKs for iOS and Android. Supports seamless video recording and video playback across all apps, browsers and devices.',
    },
    {
      header: 'Screen Recorder',
      body:
        'Ziggeo has launched the ability to record computer desktop screens right from the browser.',
    },
    {
      header: 'Video Hosting',
      body:
        'All your video hosting needs, including content delivery. Permanent or temporary hosting with moderation and workflows.',
    },
    {
      header: 'Integrations & Automated Services',
      body:
        'Plethora of different integrations to tie into your workflow and with our automated services they easily get auto pushed to any integration you need..',
    },
    {
      header: 'Video APIs',
      body:
        'All of our SDKs utilize our API and next to our server side SDKs and mobile SDKs you can easily and quickly make your own steps by utilizing our APIs directly.',
    },
  ],
  valuePropsHtml:
    '<h3>Video Recorder</h3><p>Records &#43; uploads videos from any device/browser. Supports HTML-5 / WebRTC. Mobile-friendly, responsive, and fully customizable.</p><h3>Video Transcoder</h3><p>Automatically transcodes to all desired resolutions. No complicated settings. Highly customizable. Includes video uploader.</p><h3>Video Player</h3><p>Plays videos across all devices/browsers. Is responsive, embeddable, and fully customizable. Comes with several predefined themes.</p><h3>Video SDKs</h3><p>Native mobile SDKs for iOS and Android. Supports seamless video recording and video playback across all apps, browsers and devices.</p><h3>Screen Recorder</h3><p>Ziggeo has launched the ability to record computer desktop screens right from the browser.</p><h3>Video Hosting</h3><p>All your video hosting needs, including content delivery. Permanent or temporary hosting with moderation and workflows.</p><h3>Integrations &amp; Automated Services</h3><p>Plethora of different integrations to tie into your workflow and with our automated services they easily get auto pushed to any integration you need..</p><h3>Video APIs</h3><p>All of our SDKs utilize our API and next to our server side SDKs and mobile SDKs you can easily and quickly make your own steps by utilizing our APIs directly.</p>',
};

export default product;
