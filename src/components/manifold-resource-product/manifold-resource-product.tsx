import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-product' })
export class ManifoldResourceProduct {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;

  @logger()
  render() {
    return this.data && this.data.product ? (
      <manifold-service-card-view
        description={this.data.product.tagline}
        logo={this.data.product.logo_url}
        name={this.data.product.name}
        productId={this.data.product.id}
        productLabel={this.data.product.label}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-service-card-view>
    ) : (
      // ☠
      <manifold-service-card-view
        skeleton={true}
        description="This is a loading product..."
        logo="loading.jpg"
        name="loading..."
      />
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceProduct, ['data', 'loading']);
