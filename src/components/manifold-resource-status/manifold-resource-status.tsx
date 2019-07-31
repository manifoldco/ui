import { h, Component, Prop } from '@stencil/core';

import Tunnel, { ResourceState } from '../../data/resource';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-status' })
export class ManifoldResourceStatus {
  @Prop() size?: 'small' | 'medium' = 'medium';

  @logger()
  render() {
    return (
      <Tunnel.Consumer>
        {(state: ResourceState) => (
          <manifold-resource-status-view
            size={this.size}
            resourceState={state.data && (state.data.state as string)}
            loading={state.loading}
          />
        )}
      </Tunnel.Consumer>
    );
  }
}
