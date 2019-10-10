import { Plan, PlanState } from '../../../types/graphql';

const plan: Plan = {
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
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk3f1t3ee3mc9m3ecbr6dgqgctpchhqcuv3ehm74tbmewv6ex3bdmvk2u1k6hwp4cb560h2r8kfe9j6awh279xquz8',
        node: {
          id: '235gpteq8z5tfk76f8vxhft8b2yap',
          platform: 'gcp',
          dataCenter: 'us-west-2',
          displayName: 'Google Cloud - US  West 2',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4chu3cxvm65u3ccbge0u68eb8chq7autmcdh6mrvrdctp6rvmdnjq8xvhd9w6ptb5ewh2r8kfe9j6awh279xquz8',
        node: {
          id: '235krnd90mb51mu21rgf634vyyvnw',
          platform: 'aws',
          dataCenter: 'us-east-2',
          displayName: 'AWS - US East 2 (Ohio)',
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
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4ehuppd3jehkpce3pdcv7acv86ruppcvaexh34thmemtkgt1kcnj78w9q69hp4dk5dmh2r8kfe9j6awh279xquz8',
        node: {
          id: '235nu2c0z73hq1f9qby444nnnq1fu',
          platform: 'aws',
          dataCenter: 'us-west-1',
          displayName: 'AWS - US West 1 (N. California)',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk561t6prvjddukecbh6djqerk2cgwqadv3exh78rvqennpmtb2d1jpgwkg69jp4vk570h2r8kfe9j6awh279xquz8',
        node: {
          id: '235p16bz8n7qkjtvqyg599qtqa9ur',
          platform: 'gcp',
          dataCenter: 'us-central-1',
          displayName: 'Google Cloud - US  Central 1',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk5cxukcrb36dt6atvq6dhqacvacdw6mw33e9nq0thnf0v6et3b6rv6wuhq6hj7ct9pcwh2r8kfe9j6awh279xquz8',
        node: {
          id: '235t4e0xt86hrgefbvyzh6f5dr7n4',
          platform: 'aws',
          dataCenter: 'us-west-2',
          displayName: 'AWS - US West 2 (Oregon)',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk5dnv70xvp75pkcy38e1r7cuvhcgwqew3degtq8t9netrpex3mcwv7ewhqdnu6pt34dmh2r8kfe9j6awh279xquz8',
        node: {
          id: '235u7nm47cknwjyjdyqwxg070zfmm',
          platform: 'gcp',
          dataCenter: 'us-east-4',
          displayName: 'Google Cloud - US  East 4',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk5dtvkcxvp75t66x3h6thp8utm6rwqcw1mf5nput1hf0tp6rtk6mv66x9kcnvpprb3dmh2r8kfe9j6awh279xquz8',
        node: {
          id: '235uxnm8fnf6d2wbzthz60e347rje',
          platform: 'gcp',
          dataCenter: 'us-west-1',
          displayName: 'Google Cloud - US  West 1',
        },
      },
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk5f1vppd34ddjp8ebb6xpq8u3e6tj6wutjegrpedkde8v70rvb6nhqexvgcdj64db66gh2r8kfe9j6awh279xquz8',
        node: {
          id: '235wy26njfzf53k1d050k2eg9f5ey',
          platform: 'gcp',
          dataCenter: 'us-east-1',
          displayName: 'Google Cloud - US  East 1',
        },
      },
    ],
  },
  state: PlanState.Available,
};

export default plan;
