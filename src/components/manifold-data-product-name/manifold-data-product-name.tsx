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
  /** Look up product name from resource */
  @Prop() resourceName?: string;
  @State() productName?: string;

  async componentWillLoad() {
    const { catalog, gateway } = this.connection;

    if (this.productLabel) {
      const response = await fetch(`${catalog}/products?label=${this.productLabel}`, withAuth());
      const products: Catalog.Product[] = await response.json();
      this.productName = products[0].body.name;
    }
    if (this.resourceName) {
      const response = await fetch(`${gateway}/resources/me/${this.resourceName}`, withAuth());
      const resource: Gateway.Resource = await response.json();
      this.productName = resource.product && resource.product.name;
    }
  }

  render() {
    return this.productName || <slot />;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['connection']);
