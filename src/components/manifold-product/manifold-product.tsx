import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod
  /** _(optional)_ Link format structure, with `:product` placeholder */
  @Prop() linkFormat?: string;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel: string;
  @State() product?: Catalog.ExpandedProduct;
  @State() provider?: Catalog.Provider;

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/products?label=${this.productLabel}`, withAuth())
      .then(response => response.json())
      .then(products => {
        const [product] = products;
        this.product = { ...product };
        // We’re not returning so this 2nd fetch will happen async
        fetch(`${this.connection.catalog}/providers/${product.body.provider_id}`, withAuth())
          .then(response => response.json())
          .then(provider => {
            this.provider = provider;
          })
      });
  }

  render() {
    return this.product && <manifold-product-page product={this.product} linkFormat={this.linkFormat} provider={this.provider} />;
  }
}

Tunnel.injectProps(ManifoldProduct, ['connection']);
