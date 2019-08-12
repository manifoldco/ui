import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import logger from '../../utils/logger';
import { Gateway } from '../../types/gateway';
import { buttonColors } from '../manifold-button/manifold-button';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  @Prop() showButtonColor: buttonColors = 'black';
  @Prop() hideButtonColor: buttonColors = 'white';
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  @logger()
  render() {
    return (
      <manifold-credentials
        showButtonColor={this.showButtonColor}
        hideButtonColor={this.showButtonColor}
        resourceLabel={this.data && this.data.label}
        resourceId={this.data && this.data.id}
      />
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceCredentials, ['data', 'loading']);
