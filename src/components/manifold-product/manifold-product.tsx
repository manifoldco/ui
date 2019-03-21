import { Component, Prop, State } from '@stencil/core';

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
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
    return <product-page product={this.product} />;
  }
}
