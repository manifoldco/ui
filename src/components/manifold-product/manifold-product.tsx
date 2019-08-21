import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
  /** Use auth? */
  @Prop() useAuth?: boolean = false;
  @State() product?: Catalog.Product;
  @State() provider?: Catalog.Provider;
  @Watch('productLabel') productChange(newLabel: string) {
    this.fetchProduct(newLabel);
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.restFetch) {
      return;
    }

    this.product = undefined;
    const productResp = await this.restFetch<Catalog.ExpandedProduct[]>({
      service: 'catalog',
      endpoint: `/products/?label=${productLabel}`,
      isPublic: !this.useAuth,
    });

    if (productResp && productResp.length) {
      this.product = productResp[0]; // eslint-disable-line prefer-destructuring

      this.provider = await this.restFetch<Catalog.Provider>({
        service: 'catalog',
        endpoint: `/providers/${this.product.body.provider_id}`,
        isPublic: !this.useAuth,
      });
    }
  };

  @logger()
  render() {
    return (
      <manifold-product-page product={this.product} provider={this.provider}>
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-product-page>
    );
  }
}

Tunnel.injectProps(ManifoldProduct, ['restFetch']);
