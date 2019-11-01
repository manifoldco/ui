import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource } from '../../types/graphql';

@Component({ tag: 'manifold-resource-sso' })
export class ManifoldResourceSso {
  @Prop() gqlData?: Resource;
  @Prop() loading?: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-data-sso-button
        resourceId={this.gqlData && this.gqlData.id}
        resourceLabel={this.gqlData && this.gqlData.label}
        loading={this.loading}
      >
        <slot />
      </manifold-data-sso-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceSso, ['gqlData', 'loading']);
