import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';

@Component({ tag: 'manifold-resource-details' })
export class ManifoldResourceDetails {
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => <manifold-resource-details-view data={state.data} />}
      </ResourceTunnel.Consumer>
    );
  }
}
