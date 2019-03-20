import { Component, Prop, State } from '@stencil/core';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Prop() productLabel: string;
  @State() product?: Catalog.ExpandedProduct;

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
