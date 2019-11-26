import { h, Component, Prop } from '@stencil/core';

import logger from '../../utils/logger';
import { ProductCardQuery } from '../../types/graphql';

@Component({ tag: 'manifold-service-card' })
export class ManifoldServiceCard {
  @Prop() hideUntilReady?: boolean = false;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) product?: ProductCardQuery['product'];
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;

  @logger()
  render() {
    console.warn('DEPRECATION WARNING: Use `manifold-product-card` instead.');
    return (
      <manifold-product-card
        hideUntilReady={this.hideUntilReady}
        isFeatured={this.isFeatured}
        product={this.product}
        productLabel={this.productLabel}
        productLinkFormat={this.productLinkFormat}
        preserveEvent={this.preserveEvent}
      />
    );
  }
}
