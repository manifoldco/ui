import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-deprovision' })
export class ManifoldResourceDeprovision {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  @logger()
  render() {
    return (
      <manifold-data-deprovision-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-deprovision-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceDeprovision, ['data', 'loading']);
