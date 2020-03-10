import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { GetResourceQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() ownerId?: string;
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
        disabled={this.disabled}
        loading={this.loading}
        newLabel={this.newLabel}
        ownerId={this.ownerId || (this.gqlData && this.gqlData.owner.id)}
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
      >
        <slot />
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['gqlData', 'loading']);
