import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  @Prop() disabled?: boolean;
  /** The new label to give to the resource */
  @Prop() newLabel: string = '';

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        disabled={this.disabled}
        newLabel={this.newLabel}
      >
        <slot />
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['data', 'loading']);
