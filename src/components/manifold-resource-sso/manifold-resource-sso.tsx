import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-sso' })
export class ManifoldResourceSso {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  @logger()
  render() {
    return (
      <manifold-data-sso-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
      >
        <slot />
      </manifold-data-sso-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceSso, ['data', 'loading']);
