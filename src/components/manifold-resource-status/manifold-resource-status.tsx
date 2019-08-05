import { h, Component, Prop } from '@stencil/core';

import Tunnel from '../../data/resource';
import logger from '../../utils/logger';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-status' })
export class ManifoldResourceStatus {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  @Prop() size?: 'small' | 'medium' = 'medium';

  @logger()
  render() {
    console.log('resource status', this.loading);
    return (
      <manifold-resource-status-view
        size={this.size}
        resourceState={this.data && (this.data.state as string)}
        loading={this.loading}
      />
    );
  }
}

Tunnel.injectProps(ManifoldResourceStatus, ['data', 'loading']);
