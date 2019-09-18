import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <manifold-credentials resourceLabel={this.data && this.data.label}>
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

ResourceTunnel.injectProps(ManifoldResourceCredentials, ['data', 'loading']);
