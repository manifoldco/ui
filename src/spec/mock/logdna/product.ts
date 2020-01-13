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
  categories: [
    {
      displayName: 'Logging',
      id: '00000000000000000000000000000',
      label: 'logging',
      products: emptyProducts,
    },
    {
      displayName: 'Monitoring',
      label: 'monitoring',
      id: '00000000000000000000000000000',
      products: emptyProducts,
    },
  ],
  displayName: 'LogDNA',
  documentationUrl: 'https://docs.logdna.com/docs/',
  id: '234qkjvrptpy3thna4qttwt7m2nf6',
  images: [
    'https://cdn.manifold.co/providers/logdna/logdna/images/1ew2g2d9bahjjdvrcyd7k71nwr.png',
    'https://cdn.manifold.co/providers/logdna/logdna/images/4uy1kt8we9nzbnehyzev94117m.png',
    'https://cdn.manifold.co/providers/logdna/logdna/images/nawd3ffc9nwpkw6347b8y8whgw.png',
  ],
  label: 'logdna',
  listing: { beta: false, featured: false, new: false, comingSoon: false },
  logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
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
          displayName: 'Quaco',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'e5up2rvfbxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '0 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'e5up2rvfbxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '0 MB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'e5up2rvfbxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '1',
                },
              },
            ],
          },
          free: true,
          id: '23558gd5kaw5z462e3mvaknj5veuj',
          label: 'quaco',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kc5hk2tt25gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 500,
          displayName: 'Zepto',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'f9jq0x3fbxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '7 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'f9jq0x3fbxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '90 MB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'f9jq0x3fbxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '5',
                },
              },
            ],
          },
          free: false,
          id: '2351u7mty4bkwtwqdvzmbmw1w63w2',
          label: 'zepto',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69hk2ttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 1000,
          displayName: 'Atto',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'c5u78vuzedjp2wk3d0pq4tbmcnq78',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '7 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'c5u78vuzedu6ywk1cxjjuxkfdhupu',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '175 MB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'c5u78vuzentpawkk0000000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '5',
                },
              },
            ],
          },
          free: false,
          id: '23573p7qduq7a14vb3k4ax5c02jpg',
          label: 'atto',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhk2ttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 2000,
          displayName: 'Femto',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ctjpux3fbxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '7 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ctjpux3fbxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '350 MB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'ctjpux3fbxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '5',
                },
              },
            ],
          },
          free: false,
          id: '2357cp7dmpzemfchj1tmuw908rxq6',
          label: 'femto',
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
          displayName: 'Pico',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'e1mp6vuzedjp2wk3d0pq4tbmcnq78',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'e1mp6vuzedu6ywk1cxjjuxkfdhupu',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '700 MB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'e1mp6vuzentpawkk0000000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '2354a2a6t4pxnv2mp88zacwvdqn4g',
          label: 'pico',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69hk2ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 10000,
          displayName: 'Nano',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dtgpwvuzedjp2wk3d0pq4tbmcnq78',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dtgpwvuzedu6ywk1cxjjuxkfdhupu',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '1.5 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'dtgpwvuzentpawkk0000000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '235fckeg3u3d31uxrq3uv717uxd58',
          label: 'nano',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhk2ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 20000,
          displayName: 'Micro',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dnmp6wkfbxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dnmp6wkfbxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '3 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'dnmp6wkfbxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '2351fzva4f783dwaeqkw0kecrdnp8',
          label: 'micro',
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
          displayName: 'Milli',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dnmprv39bxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dnmprv39bxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '5.5 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'dnmprv39bxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '2351ujxurnkyug6akadkacyvmb02e',
          label: 'milli',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kcnj3jttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 75000,
          displayName: 'Centi',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cdjpwx39bxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cdjpwx39bxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '10 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'cdjpwx39bxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '2358fw1rfjtjv0ubty0waymvd204c',
          label: 'centi',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69hk2ttp61t36c125gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 100000,
          displayName: 'Deci',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjp6uazedjp2wk3d0pq4tbmcnq78',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '30 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjp6uazedu6ywk1cxjjuxkfdhupu',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '10 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'chjp6uazentpawkk0000000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '25',
                },
              },
            ],
          },
          free: false,
          id: '235dfgpddef0b63cvxc1v3fuqvvxw',
          label: 'deci',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69j3jttp61t36c125gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 150000,
          displayName: 'Deca',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjp6razedjp2wk3d0pq4tbmcnq78',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '14 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'chjp6razedu6ywk1cxjjuxkfdhupu',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '20 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'chjp6razentpawkk0000000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '10',
                },
              },
            ],
          },
          free: false,
          id: '2354fnphxzc4jvx9fw7pbgwh187y4',
          label: 'deca',
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
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhk2ttp61t36c125gh6ywk4cnt24ekvfnyg',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 200000,
          displayName: 'Hecto',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
                node: {
                  id: 'd1jp6x3fbxtparbjcdm2uwk5ehjpw',
                  label: 'search-retention',
                  displayName: 'Search Retention',
                  displayValue: '30 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm74r62x3he1t7grk4cdpped9gehh6md1h68v34y9r48p24vvjchjq48hufdyqu',
                node: {
                  id: 'd1jp6x3fbxtq8vvjc5kpabbpdxp7a',
                  label: 'storage-volume',
                  displayName: 'Storage Volume Per Day',
                  displayValue: '20 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
                node: {
                  id: 'd1jp6x3fbxuq6tbjec00000000000',
                  label: 'users',
                  displayName: 'Users',
                  displayValue: '25',
                },
              },
            ],
          },
          free: false,
          id: '2359e5042rt0hvf2b4tpjmg2ahp62',
          label: 'hecto',
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
    id: '23409yv8yfy06gt8553wzz5x8k164',
    displayName: 'LogDNA',
    label: 'logdna',
    logoUrl: '',
    supportEmail: '',
    url: '',
  },
  settings: {
    ssoSupported: true,
    credentialsSupport: ProductCredentialsSupportType.Single,
  },
  setupStepsHtml:
    '<ol><li><p><a href="https://docs.logdna.com" rel="nofollow">Select a code library from the LogDNA documentation</a></p>\n</li><li><p>Copy your API credentials from our dashboard</p>\n</li><li><p>Configure the logger with your API key</p>\n</li><li><p>Start your application</p>\n</li><li><p>Monitor your logs from the LogDNA dashboard</p>\n</li></ol>',
  state: ProductState.Available,
  supportEmail: 'support@logdna.com',
  tagline: 'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
  tags: ['logging', 'monitoring'],
  termsUrl: 'https://logdna.com/terms.html',
  valueProps: [
    {
      header: 'Aggregate Logs & Analyze Events',
      body:
        'Centralize your logs in one place instead of tailing one file at a time. Aggregate, search & filter from all your hosts and apps. See related events across your infrastructure on one screen.',
    },
    {
      header: 'Powerful Search & Alerts',
      body:
        'With our blazing fast speeds, search like a pro and set up alerts with just a few clicks. Easily send important event notifications through email, Slack, or even a custom webhook.',
    },
    {
      header: 'Easy Setup',
      body:
        'Get up and running in mere minutes! Spend that saved time building your awesome product instead.',
    },
    {
      header: 'Automatic Field Parsing',
      body:
        'Search for specific fields and values automatically picked up from common log formats, such as JSON, Redis, HTTP access logs, and a whole host of others.',
    },
    {
      header: 'Debug & Troubleshoot Faster',
      body:
        'Diagnose issues, chase down server errors and look up customer activity, fast! Use live streaming tail to instantly surface hard-to-find bugs.',
    },
    {
      header: 'Modern User Interface',
      body:
        'Filter, search, live tail, jump back in time, create views and alerts, all from one interface without leaving the page.',
    },
  ],
  valuePropsHtml:
    '<h3>Aggregate Logs &amp; Analyze Events</h3><p>Centralize your logs in one place instead of tailing one file at a time. Aggregate, search &amp; filter from all your hosts and apps. See related events across your infrastructure on one screen.</p><h3>Powerful Search &amp; Alerts</h3><p>With our blazing fast speeds, search like a pro and set up alerts with just a few clicks. Easily send important event notifications through email, Slack, or even a custom webhook.</p><h3>Easy Setup</h3><p>Get up and running in mere minutes! Spend that saved time building your awesome product instead.</p><h3>Automatic Field Parsing</h3><p>Search for specific fields and values automatically picked up from common log formats, such as JSON, Redis, HTTP access logs, and a whole host of others.</p><h3>Debug &amp; Troubleshoot Faster</h3><p>Diagnose issues, chase down server errors and look up customer activity, fast! Use live streaming tail to instantly surface hard-to-find bugs.</p><h3>Modern User Interface</h3><p>Filter, search, live tail, jump back in time, create views and alerts, all from one interface without leaving the page.</p>',
};

export default product;
