import {
  PlanFeatureType,
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
      displayName: 'Database',
      id: '00000000000000000000000000000',
      label: 'database',
      products: emptyProducts,
    },
  ],
  displayName: 'JawsDB MySQL',
  documentationUrl: 'https://jawsdb.com/docs',
  id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
  images: [
    'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
    'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
    'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
    'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
  ],
  label: 'jawsdb-mysql',
  logoUrl: 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png',
  plans: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
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
          displayName: 'Kitefin',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtdcdqpw',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '10',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtdd1mpe',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtde9gpu',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: 'Shared',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtde9qpr',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '0 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtdedmpw',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ddmq8tb6d5q5ywvmc5u6jrtdedu6y',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '250 MB',
                },
              },
            ],
          },
          free: false,
          id: '235abe2ba8b39e941u2h70ayw5m9j',
          label: 'kitefin',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
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
          displayName: 'Leopard',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtdcdqpw',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '15',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtdd1mpe',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtde9gpu',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: 'Shared',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtde9qpr',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '0 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtdedmpw',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'dhjpyw31e9j5ywvmc5u6jrtdedu6y',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '1 GB',
                },
              },
            ],
          },
          free: false,
          id: '23556xtwybe9zv877e6g2c7ygnxpj',
          label: 'leopard',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
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
          displayName: 'Blacktip',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35nhpy',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '30',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35nm6j',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35nt62',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: 'Shared',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35nt6y',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '0 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35ntpj',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'false',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'c9p62rvbehmq0qvkehgq8ub35ntq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '2.5 GB',
                },
              },
            ],
          },
          free: false,
          id: '2358u3xj4d8x5qud8x1atgafwchfy',
          label: 'blacktip',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6thq8ttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1p6ht64cv4chuq2c3qe8h2r8kfe9j6awh279xquz8',
                node: {
                  displayName: 'Backups',
                  id: 'cduq6x3fdnfp4rb3dduq0wr000000',
                  label: 'backups',
                  numericDetails: {
                    costTiers: [
                      {
                        cost: 0,
                        limit: 35,
                      },
                    ],
                    increment: 1,
                    max: 35,
                    min: 0,
                    unit: 'Days',
                  },
                  options: [
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: 'Backups',
                      displayValue: 'backups',
                    },
                  ],
                  type: PlanFeatureType.Number,
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pd9v6puv5d1kq0xvjerup4y38e1t74rkbcnhj4b12dxt68tbj48x7pzbx',
                node: {
                  displayName: 'RAM',
                  id: 'cduq6x3fdnfpjvkkehgpwrv5bxhpr',
                  label: 'instance_class',
                  options: [
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '1 GB',
                      displayValue: 'db.t2.micro',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '2 GB',
                      displayValue: 'db.t2.small',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '4 GB',
                      displayValue: 'db.m3.medium',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '8 GB',
                      displayValue: 'db.m4.large',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '15 GB',
                      displayValue: 'db.r4.large',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '31 GB',
                      displayValue: 'db.r4.xlarge',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '61 GB',
                      displayValue: 'db.r4.2xlarge',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '122 GB',
                      displayValue: 'db.r4.4xlarge',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '244 GB',
                      displayValue: 'db.r4.8xlarge',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: '488 GB',
                      displayValue: 'db.r4.16xlarge',
                    },
                  ],
                  type: PlanFeatureType.String,
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6hu64d35dtrkce3jc9jp6t3qcwh2r8kfe9j6awh279xquz8',
                node: {
                  displayName: 'High Availability',
                  id: 'cduq6x3fdnfq4tb4enq68rbecdwg0',
                  label: 'redundancy',
                  options: [
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: 'Yes',
                      displayValue: 'true',
                    },
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: 'No',
                      displayValue: 'false',
                    },
                  ],
                  type: PlanFeatureType.Boolean,
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1q6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  displayName: 'Storage',
                  id: 'cduq6x3fdnfq6x3fe9gpet8000000',
                  label: 'storage',
                  numericDetails: {
                    costTiers: [
                      {
                        cost: 200000000,
                        limit: 16000,
                      },
                    ],
                    increment: 1,
                    max: 16000,
                    min: 0,
                    unit: 'GB',
                  },
                  options: [
                    {
                      id: '00000000000000000000000000000',
                      label: '',
                      displayName: 'Storage',
                      displayValue: 'storage',
                    },
                  ],
                  type: PlanFeatureType.Number,
                },
              },
            ],
          },
          cost: 3300,
          displayName: 'Custom',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'cduq6x3fdnfq6x31ehmp6bbkd5q6e',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
            ],
          },
          free: false,
          id: '235exy25wvzpxj52p87bh87gbnj4y',
          label: 'custom',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tj3jttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 3500,
          displayName: 'Whitetip',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35nhpy',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '66',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35nm6j',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35nt62',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '1 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35nt6y',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '1 Day',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35ntpj',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'exm6jx35ehmq0qvkehgq8ub35ntq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '5 GB',
                },
              },
            ],
          },
          free: false,
          id: '235fyub2rhaz2aqkj3xvtbzgkc3aw',
          label: 'whitetip',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kcdj3jttp60h2r8kfe9j6awh279xquz8',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 6500,
          displayName: 'Whitetip Alpha',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '66',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'true',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '1 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '2 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'exm6jx35ehmq0rbce1m62qvkehgq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '5 GB',
                },
              },
            ],
          },
          free: false,
          id: '235f4zy6ydbpbhmdkn4tx1rgu4pcj',
          label: 'whitetipalpha',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k69hkjttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 11000,
          displayName: 'Thresher',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35nhpy',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '150',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35nm6j',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35nt62',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '2 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35nt6y',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '1 Day',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35ntpj',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ehm74tbkd1jq4qvkehgq8ub35ntq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '50 GB',
                },
              },
            ],
          },
          free: false,
          id: '235dutw688y1uqcuqcyvz9twc7yke',
          label: 'thresher',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
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
          displayName: 'Tiger',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjurvfdtq6a',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '300',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjuu39cxm2u',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjuwk1dm000',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '4 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjuwkfdhp64',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '1 Day',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjuwv9dtkpr',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ehmpetbjbxtq8rbmd5hjuwvmdxt62',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '100 GB',
                },
              },
            ],
          },
          free: false,
          id: '2352ekm35rff86k1w1yfcxhex2waw',
          label: 'tiger',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
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
          displayName: 'Thresher Alpha',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '150',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'true',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '2 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '2 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ehm74tbkd1jq4rbce1m62qvkehgq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '50 GB',
                },
              },
            ],
          },
          free: false,
          id: '2350hd8b2fe5a5vzj21xzuf558vku',
          label: 'thresheralpha',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6tjk2ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 38000,
          displayName: 'Tiger Alpha',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '300',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'true',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '4 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '2 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'ehmpetbjc5p70u31bxtq8rbmd5hju',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '100 GB',
                },
              },
            ],
          },
          free: false,
          id: '235e1x01g4hgyf86e4wyp16x4k738',
          label: 'tigeralpha',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k71j32ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 44000,
          displayName: 'Hammerhead',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '600',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'false',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '8 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '1 Day',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'd1gpuvb5e9m6arb4bxtq8rbmd5hju',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '250 GB',
                },
              },
            ],
          },
          free: false,
          id: '2353vuh3mpw4ufnqjwnentch3wmkj',
          label: 'hammerhead',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
                },
              },
            ],
          },
          state: PlanState.Available,
        },
      },
      {
        cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1kcxhk2ttp61t308hc49qq4t35e8h3myvxfm',
        node: {
          configurableFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [],
          },
          cost: 80000,
          displayName: 'Hammerhead Alpha',
          fixedFeatures: {
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
            edges: [
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1m6tv7ctb4ehn70dkr6cwp8y3h6wv24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-connections',
                  displayName: 'Connections',
                  displayValue: '600',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1mcxup4dv461kk8ckrdcrp8dbg6rt74uttchm6uw9rf4w24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-high-availability',
                  displayName: 'High Availability',
                  displayValue: 'true',
                },
              },
              {
                cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hkp2t125gh6ywk4cnt24ekvfnyg',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-ram',
                  displayName: 'RAM',
                  displayValue: '8 GB',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6hv7crv4d1m3cckjeth24b12dxt68tbj48x7pzbx',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-rollback',
                  displayName: 'Rollback',
                  displayValue: '2 Days',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tup4tb3f1r3cr9r69pp6vkh6rt7cuvd48p24vvjchjq48hufdyqu',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-single-tenant',
                  displayName: 'Single Tenant',
                  displayValue: 'true',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tw36tk575kq0tbm70h2r8kfe9j6awh279xquz8',
                node: {
                  id: 'd1gpuvb5e9m6arb4c5p70u31bxtq8',
                  label: 'static-storage',
                  displayName: 'Storage',
                  displayValue: '250 GB',
                },
              },
            ],
          },
          free: false,
          id: '2354cmvu65xccvw974kfjh616b2x0',
          label: 'hammerheadalpha',
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
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dnu3cdk475m6cd3j6dhp6u3ecnu7cdtrenu70t9hemv66t1tdthkjv9q61uqcvb66gh2r8kfe9j6awh279xquz8',
                node: {
                  id: '235m2c51y0625vvtk6ptf55bhpkty',
                  platform: 'aws',
                  dataCenter: 'eu-west-1',
                  displayName: 'AWS - EU West 1 (Ireland)',
                },
              },
              {
                cursor:
                  'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4dtpkcw3nehm3cvkee5n68xhrccu7ew9jewtpwdk8ddr34ybbd9jkavhq71hppdv570h2r8kfe9j6awh279xquz8',
                node: {
                  id: '235mhkk15ky7ha9qpu4gazrqjt2gr',
                  platform: 'aws',
                  dataCenter: 'us-east-1',
                  displayName: 'AWS - US East 1 (N. Virginia)',
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
    id: '2346mdxcuca9ez2n93f72nb2fpjgu',
    displayName: 'JawsDB',
    label: 'jawsdb',
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
  supportEmail: 'support@jawsdb.com',
  tagline: 'Fast, reliable, no-bullshark MySQL as a Service',
  tags: ['database'],
  termsUrl: '',
  valueProps: [
    {
      header: 'Trust in Jaws',
      body:
        'Get access to the same database trusted by sites such as Google, Facebook, Twitter, Youtube, and more.',
    },
    {
      header: 'Backups',
      body:
        'In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.',
    },
    {
      header: 'Databites',
      body:
        'Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!',
    },
    {
      header: 'Scale',
      body:
        "Regardless of how big of a wave you're riding, JawsDB makes it easy to scale your database performance.",
    },
    {
      header: 'Stay in Control',
      body:
        'For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.',
    },
    {
      header: 'Data Replication',
      body:
        "The world doesn't need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.",
    },
  ],
  valuePropsHtml:
    '<h3>Trust in Jaws</h3><p>Get access to the same database trusted by sites such as Google, Facebook, Twitter, Youtube, and more.</p><h3>Backups</h3><p>In addition to any backups you personally create, we automatically take nightly snapshots for single tenant databases. This means that our team can help you restore to a previous point in time.</p><h3>Databites</h3><p>Create, edit, and save reusable queries against your provisioned server. Databites are a custom, zero-hassle reporting solution for your database right out of the box!</p><h3>Scale</h3><p>Regardless of how big of a wave you&#39;re riding, JawsDB makes it easy to scale your database performance.</p><h3>Stay in Control</h3><p>For single tenant plans, we provide you and only you with root credentials — so you have complete control of your server.</p><h3>Data Replication</h3><p>The world doesn&#39;t need to be a scary place, choose a plan that supports failover and your data is replicated to servers in different regions of the world, reducing unexpected downtime.</p>',
};

export default product;
