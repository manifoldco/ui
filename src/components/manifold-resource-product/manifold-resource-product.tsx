import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { GetResourceQuery } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-resource-product' })
export class ManifoldResourceProduct {
  @Prop() loading?: boolean = true;
  @Prop() gqlData?: GetResourceQuery['resource'];

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (this.loading || !this.gqlData) {
      return (
        // ☠
        <manifold-product-card-view
          skeleton={true}
          description="This is a loading product..."
          logo="loading.jpg"
          name="loading..."
        >
          <manifold-forward-slot slot="cta">
            <slot name="cta" />
          </manifold-forward-slot>
        </manifold-product-card-view>
      );
    }

    const { product } = this.gqlData.plan;

    return (
      <manifold-product-card-view
        description={product.tagline}
        logo={product.logoUrl}
        name={product.displayName}
        productId={product.id}
        productLabel={product.label}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-product-card-view>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceProduct, ['gqlData', 'loading']);
