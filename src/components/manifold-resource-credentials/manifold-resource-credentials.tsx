import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger, { loadMark } from '../../utils/logger';
import { GetResourceQuery } from '../../types/graphql';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  @Prop() ownerId?: string;
  @Prop() gqlData?: GetResourceQuery['resource'];
  @Prop() loading?: boolean = true;
  @Prop() noCredentials?: boolean = false;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (!this.gqlData || this.loading) {
      return <manifold-credentials-view loading={true} />;
    }

    return (
      <manifold-credentials
        ownerId={this.ownerId || this.gqlData.owner.id}
        resourceLabel={this.gqlData.label}
        noCredentials={this.noCredentials}
      >
        <manifold-forward-slot slot="show-button">
          <slot name="show-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="hide-button">
          <slot name="hide-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="sso-button">
          <slot name="sso-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="no-credentials">
          <slot name="no-credentials" />
        </manifold-forward-slot>
      </manifold-credentials>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceCredentials, ['gqlData', 'loading']);
