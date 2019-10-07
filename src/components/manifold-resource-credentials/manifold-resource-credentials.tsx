import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Resource } from '../../types/graphql';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  @Prop() gqlData?: Resource;
  @Prop() loading: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (!this.gqlData || this.loading) {
      return <manifold-credentials-view loading={true} />;
    }

    return (
      <manifold-credentials resourceLabel={this.gqlData.label}>
        <manifold-forward-slot slot="show-button">
          <slot name="show-button" />
        </manifold-forward-slot>
        <manifold-forward-slot slot="hide-button">
          <slot name="hide-button" />
        </manifold-forward-slot>
      </manifold-credentials>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceCredentials, ['gqlData', 'loading']);
