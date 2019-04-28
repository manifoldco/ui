import { Component, Prop, State, Element } from '@stencil/core';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-logo' })
export class ManifoldDataProductLogo {
  @Element() el: HTMLElement;
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod; // Provided by manifold-connection
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceName?: string;
  @State() product?: Catalog.Product;

  async componentWillLoad() {
    const { catalog, gateway } = this.connection;

    if (this.productLabel) {
      const response = await fetch(`${catalog}/products?label=${this.productLabel}`, withAuth());
      const products: Catalog.Product[] = await response.json();
      this.product = products[0]; // eslint-disable-line prefer-destructuring
    }
    if (this.resourceName) {
      const response = await fetch(`${gateway}/resources/me/${this.resourceName}`, withAuth());
      const resource: Gateway.Resource = await response.json();
      const productId = resource.product && resource.product.id;
      const productResp = await fetch(`${catalog}/products/${productId}`, withAuth());
      const product: Catalog.Product = await productResp.json();
      this.product = product;
    }

    return null;
  }

  render() {
    return this.product ? (
      <img src={this.product.body.logo_url} alt={this.alt || this.product.body.name} />
    ) : (
      <slot />
    );
  }
}

Tunnel.injectProps(ManifoldDataProductLogo, ['connection']);
