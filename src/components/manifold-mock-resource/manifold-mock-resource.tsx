import { Component, h, Prop, State } from '@stencil/core';
import { PlanState, ResourceStatusLabel, GetResourceQuery } from '../../types/graphql';
import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';

const GraphQLResource: GetResourceQuery['resource'] = {
  id: '268a3d5z80rq7dau0yv25nyf00jfe',
  label: 'logdna-elaborate-old-moss-green-deltoid',
  plan: {
    id: '23558gd5kaw5z462e3mvaknj5veuj',
    label: 'quaco',
    displayName: 'Quaco',
    state: PlanState.Available,
    cost: 0,
    free: true,
    regions: {
      pageInfo: {
        startCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        endCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          node: {
            id: '235n4f9pxf8eyraj3y159x89z6jer',
            displayName: 'All Regions',
            platform: 'all',
            dataCenter: 'global',
          },
          cursor:
            'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1k6hhq8vk4e9ukcrv5c9kpccbb6dkq8rkmcmwpew3dcdv78dhmennpmy9he8vkay1kcduppdb570h2r8kfe9j6awh279xquz8',
        },
      ],
    },
    product: {
      displayName: 'LogDNA',
      id: '234qkjvrptpy3thna4qttwt7m2nf6',
      label: 'logdna',
      logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
      tagline:
        'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
    },
    fixedFeatures: {
      pageInfo: {
        startCursor:
          'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1n6tu64cb575m70ttr69n66vkn6tgqcuvdcguq2w3q48p24vvjchjq48hufdyqu',
        endCursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
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
          cursor: 'fch78ybgcmh3m8h25gh66xbjedqq48hu48r30c1nc5vqcdb575u6e8hc49qq4t35e8h3myvxfm',
          node: {
            id: 'e5up2rvfbxuq6tbjec00000000000',
            label: 'users',
            displayName: 'Users',
            displayValue: '1',
          },
        },
      ],
    },
    meteredFeatures: {
      pageInfo: { startCursor: '', endCursor: '', hasNextPage: false, hasPreviousPage: false },
      edges: [],
    },
    configurableFeatures: {
      pageInfo: { startCursor: '', endCursor: '', hasNextPage: false, hasPreviousPage: false },
      edges: [],
    },
  },
  region: { id: '235n4f9pxf8eyraj3y159x89z6jer', displayName: 'All Regions' },
  status: { label: ResourceStatusLabel.Available, message: 'Available' },
  configuredFeatures: {
    edges: [],
  },
};

@Component({ tag: 'manifold-mock-resource' })
export class ManifoldMockResource {
  @Prop() gqlMock: GetResourceQuery['resource'] = GraphQLResource;
  @State() resource?: GetResourceQuery['resource'];
  @State() loading: boolean = true;

  @loadMark()
  componentWillLoad() {
    window.setTimeout(() => {
      this.loading = false;
      this.resource = this.gqlMock;
    }, 300);
  }

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider state={{ loading: this.loading, gqlData: this.gqlMock }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
