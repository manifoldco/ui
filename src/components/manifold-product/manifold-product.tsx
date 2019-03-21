import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  @Prop() url: string;
  @Prop() productLabel: string;
  @State() product?: Catalog.ExpandedProduct;

  componentWillLoad() {
    return fetch(`${this.url}/products?label=${this.productLabel}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  render() {
    return this.product && <product-page product={this.product} />;
  }
}

Tunnel.injectProps(ManifoldProduct, ['url']);
