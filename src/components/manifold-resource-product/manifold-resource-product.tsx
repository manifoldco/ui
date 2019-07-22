import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-product' })
export class ManifoldResourceProduct {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  @Prop() asCard?: boolean = false;

  render() {
    return this.data && this.data.product ? (
      <manifold-service-view
        name={this.data.product.name}
        description={this.data.product.tagline}
        label={this.data.product.label}
        logo={this.data.product.logo_url}
        productId={this.data.product.id}
        asCard={this.asCard}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-service-view>
    ) : (
      // ☠
      <manifold-service-view
        loading={true}
        name="loading..."
        description="This is a loading product..."
        asCard={this.asCard}
      />
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceProduct, ['data', 'loading']);
