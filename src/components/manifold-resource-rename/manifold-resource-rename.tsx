import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GetResourceQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() loading?: boolean = true;
  @Prop() disabled?: boolean;
  /** The new label to give to the resource */
  @Prop() newLabel?: string = '';

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
        loading={this.loading}
        disabled={this.disabled}
        newLabel={this.newLabel}
      >
        <slot />
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['gqlData', 'loading']);
