import { Component, Prop, State } from '@stencil/core';
import { Product } from 'types/Product';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Prop() productLabel: string;
  @State() product?: Product;

  componentWillLoad() {
    return fetch(`https://api.catalog.manifold.co/v1/products?label=${this.productLabel}`)
      .then(response => response.json())
      .then(data => {
        this.product = { ...data[0] };
      });
  }

  render() {
    return <product-page product={this.product} />;
  }
}
