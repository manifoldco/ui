
import { Component, Prop, State, Element } from '@stencil/core';
import Tunnel from '../../data/connection';
import { Connection, connections, Env } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-logo' })

export class ManifoldDataProductLogo {
  @Element() el: HTMLElement;
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections[Env.Prod]; // Provided by manifold-connection
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel: string;
  @State() product?: Catalog.ExpandedProduct;

  componentWillLoad() {
    // Don’t return this promise to invoke the loading state
    fetch(`${this.connection.catalog}/products?label=${this.productLabel}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  render() {
    return this.product ? <img src={this.product.body.logo_url} alt={this.alt || this.product.body.name} /> : <slot />
  }

}

Tunnel.injectProps(ManifoldDataProductLogo, ['connection']);
