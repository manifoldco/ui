import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Env, Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  @Prop() connection: Connection = connections[Env.Prod];
  @Prop() productLabel: string;
  @State() product?: Catalog.ExpandedProduct;

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/products?label=${this.productLabel}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  render() {
    return this.product && <product-page product={this.product} />;
  }
}

Tunnel.injectProps(ManifoldProduct, ['connection']);
