import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
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
    const productResp = await this.restFetch<Catalog.ExpandedProduct[]>(
      'catalog',
      `/products/?label=${productLabel}`
    );

    if (productResp instanceof Error) {
      console.error(productResp);
      return;
    }

    this.product = productResp[0]; // eslint-disable-line prefer-destructuring

    const providerResp = await this.restFetch<Catalog.Provider>(
      'catalog',
      `/providers/${productResp[0].body.provider_id}`
    );

    if (providerResp instanceof Error) {
      console.error(providerResp);
      return;
    }

    this.provider = providerResp;
  };

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
