import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Product, Resource } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-product' })
export class ManifoldResourceProduct {
  @Prop() gqlData?: Resource;
  @Prop() loading: boolean = true;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    let product: Product | null | undefined;
    if (!this.loading && this.gqlData) {
      if (this.gqlData.plan) {
        product = this.gqlData.plan.product;
      }
    }

    if (this.loading || !product) {
      return (
        // ☠
        <manifold-service-card-view
          skeleton={true}
          description="This is a loading product..."
          logo="loading.jpg"
          name="loading..."
        >
          <manifold-forward-slot slot="cta">
            <slot name="cta" />
          </manifold-forward-slot>
        </manifold-service-card-view>
      );
    }

    return (
      <manifold-service-card-view
        description={product.tagline}
        logo={product.logoUrl}
        name={product.displayName}
        productId={product.id}
        productLabel={product.label}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-service-card-view>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceProduct, ['gqlData', 'loading']);
