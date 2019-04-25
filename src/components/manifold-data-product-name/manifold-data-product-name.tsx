import { Component, Prop, State, Element } from '@stencil/core';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod; // Provided by manifold-connection
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Product ID (e.g. `"jawsdb-mysql"`) */
  @Prop() productId?: string;
  @State() product?: Catalog.ExpandedProduct;

  componentWillLoad() {
    if (this.productLabel) {
      // Don’t return this promise to invoke the loading state
      return fetch(`${this.connection.catalog}/products?label=${this.productLabel}`, withAuth())
        .then(response => response.json())
        .then(data => {
          this.product = { ...data[0] };
        });
    }
    if (this.productId) {
      // Don’t return this promise to invoke the loading state
      return fetch(`${this.connection.catalog}/products/${this.productId}`, withAuth())
        .then(response => response.json())
        .then(data => {
          this.product = data;
        });
    }

    return null;
  }

  render() {
    return this.product ? this.product.body.name : <slot />;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['connection']);
