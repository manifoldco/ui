import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
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
    const productResp = await fetch(
      `${this.connection.catalog}/products?label=${productLabel}`,
      withAuth()
    );
    const products: Catalog.Product[] = await productResp.json();
    this.product = products[0]; // eslint-disable-line prefer-destructuring
    const providerResp = await fetch(
      `${this.connection.catalog}/providers/${products[0].body.provider_id}`,
      withAuth()
    );
    const provider = await providerResp.json();
    this.provider = provider;
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

Tunnel.injectProps(ManifoldProduct, ['connection']);
