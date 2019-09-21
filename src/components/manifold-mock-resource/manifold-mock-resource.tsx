import { h, Component, State, Prop } from '@stencil/core';
import { PlanState, Resource, ResourceStatus } from '../../types/graphql';
import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

const ResourceMock: Resource = {
  id: '1',
  label: 'logdna',
  displayName: 'logdna',
  owner: {
    __typename: 'Profile',
    id: 'manifold.co/user/2',
    platform: {
      id: '',
      domain: '',
    },
    subject: '',
  },
  plan: {
    cost: 50000,
    free: false,
    label: 'milli',
    displayName: 'Milli',
    state: PlanState.Available,
    fixedFeatures: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: '',
          node: {
            label: 'users',
            displayName: 'Users',
            displayValue: '10',
          },
        },
        {
          cursor: '',
          node: {
            label: 'search-retention',
            displayName: 'Search Retention',
            displayValue: '14 Days',
          },
        },
        {
          cursor: '',
          node: {
            label: 'storage-volume',
            displayName: 'Storage Volume Per Day',
            displayValue: '5.5 GB',
          },
        },
      ],
    },
    id: '17',
  },
  ssoSupported: true,
  ssoUrl: '',
  status: ResourceStatus.Available,
};

@Component({ tag: 'manifold-mock-resource' })
export class ManifoldMockResource {
  @Prop() mock: Resource = ResourceMock;
  @State() resource?: Resource;
  @State() loading: boolean = true;

  @loadMark()
  componentWillLoad() {
    window.setTimeout(() => {
      this.loading = false;
      this.resource = this.mock;
    }, 300);
  }

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
