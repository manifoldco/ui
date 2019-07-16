import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['data', 'loading']);

