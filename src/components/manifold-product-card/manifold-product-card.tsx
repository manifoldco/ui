import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Catalog } from '../../types/catalog';

@Component({ tag: 'manifold-product-card' })
export class ManifoldProductCard {
  @Element() el: HTMLElement;
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;

  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() product?: Catalog.Product;

  @Watch('productLabel') productLabelChange(newlabel: string) {
    this.fetchProduct(newlabel);
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  async fetchProduct(productLabel: string) {
    if (!this.connection) {
      return;
    }

    const response = await fetch(
      `${this.connection.catalog}/products/?label=${productLabel}`,
      withAuth(this.authToken)
    );
    const products: Catalog.Product[] = await response.json();
    if (products.length) {
      // eslint-disable-next-line prefer-destructuring
      this.product = products[0];
    }
  }

  render() {
    return this.product ? (
      <manifold-service-card
        name={this.product.body.name}
        description={this.product.body.tagline}
        label={this.product.body.label}
        productLinkFormat={this.productLinkFormat}
        logo={this.product.body.logo_url}
        productId={this.product.id}
        preserveEvent={this.preserveEvent}
      />
    ) : (
      // ☠
      <manifold-service-card
        name="loading"
        description="This awesome product is loading"
        skeleton={true}
      />
    );
  }
}

Tunnel.injectProps(ManifoldProductCard, ['connection', 'authToken']);
