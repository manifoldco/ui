import { h, Component } from '@stencil/core';

import Tunnel, { ResourceState } from '../../data/resource';

@Component({ tag: 'manifold-resource-status' })
export class ManifoldResourceStatus {
  render() {
    return (
      <Tunnel.Consumer>
        {(state: ResourceState) => <manifold-resource-status-view resourceState={state} />}
      </Tunnel.Consumer>
    );
  }
}
