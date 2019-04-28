import { Component, Prop, State, Element, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() hideCta?: boolean = false;
  /** _(optional)_ Link format structure, with `:product` placeholder */
  @Prop() linkFormat?: string;
  /** Should the JS event still fire, even if link-format is passed?  */
  @Prop() preserveEvent: boolean = false;
  @Prop() productLabel: string;
  @State() product?: Catalog.Product;
  @State() provider?: Catalog.Provider;
  @Watch('productLabel') productChanged(newLabel: string) {
    this.fetchProduct(newLabel);
  }

  componentWillLoad() {
    this.fetchProduct();
  }

  fetchProduct = async (productLabel: string = this.productLabel) => {
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
      <manifold-product-page
        hideCta={this.hideCta}
        linkFormat={this.linkFormat}
        preserveEvent={this.preserveEvent}
        product={this.product}
        provider={this.provider}
      />
    );
  }
}

Tunnel.injectProps(ManifoldProduct, ['connection']);
