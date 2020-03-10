import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { ResourceWithOwnerQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-deprovision' })
export class ManifoldResourceDeprovision {
  @Prop() disabled?: boolean;
  @Prop() ownerId?: string;
  @Prop() gqlData?: ResourceWithOwnerQuery['resource'];
  @Prop() loading?: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-deprovision-button
        disabled={this.disabled}
        loading={this.loading}
        ownerId={this.ownerId || (this.gqlData && this.gqlData.owner.id)}
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
      >
        <slot />
      </manifold-data-deprovision-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceDeprovision, ['gqlData', 'loading']);
