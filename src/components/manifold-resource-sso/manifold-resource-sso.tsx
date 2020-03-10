import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { GetResourceQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-sso' })
export class ManifoldResourceSso {
  @Prop() disabled?: boolean;
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() ownerId?: string;
  @Prop() loading?: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-sso-button
        disabled={this.disabled || !this.gqlData}
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
        ownerId={this.ownerId || (this.gqlData && this.gqlData.owner.id)}
        loading={this.loading}
      >
        <slot />
      </manifold-data-sso-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceSso, ['gqlData', 'loading']);
