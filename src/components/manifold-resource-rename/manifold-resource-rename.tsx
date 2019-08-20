import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  /** The new label to give to the resource */
  @Prop() newLabel: string = '';

  @logger()
  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        newLabel={this.newLabel}
      >
        <slot />
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['data', 'loading']);
