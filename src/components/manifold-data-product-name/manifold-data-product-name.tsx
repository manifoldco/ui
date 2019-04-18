
import { Component, Prop, State, Element } from '@stencil/core';
import Tunnel from '../../data/connection';
import { Connection, connections, Env } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-name' })

export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  @Prop() productLabel: string; // E.g. 'jawsdb-mysql'
  @Prop() connection: Connection = connections[Env.Prod]; // Provided by manifold-connection
  @State() product?: Catalog.ExpandedProduct;

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/products?label=${this.productLabel}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  render() {
    return this.product ? this.product.body.name : <slot />
  }

}

Tunnel.injectProps(ManifoldDataProductName, ['connection']);
