import { Plan, PlanState } from '../../../types/graphql';

// https://graphqlbin.com/v2/ZzgWFo
const plan: Plan = {
  configurableFeatures: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [],
  },
  cost: 0,
  displayName: 'Free',
  fixedFeatures: {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
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
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    edges: [
      {
        cursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1pe9up4t346nukcdkn6cup6t3ecwh2r8kfe9j6awh279xquz8',
        node: {
          id: 'ctt6at9d65fprubdd5u66u35cdng0',
          label: 'limitcheck',
          displayName: 'Limitcheck',
          numericDetails: {
            costTiers: [],
            unit: 'check',
          },
        },
      },
    ],
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
};

export default plan;
