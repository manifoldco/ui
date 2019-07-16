import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';

@Component({
  tag: 'manifold-resource-rename',
  shadow: true,
})
export class ManifoldResourceRename {
  /** Which html tag to use as the root for the component */
  @Prop() as?: 'button' | 'a' = 'button';
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        as={this.as}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['data', 'loading']);

