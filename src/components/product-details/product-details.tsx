import { Component, Prop } from '@stencil/core';
import { Product } from 'types/Product';

@Component({
  tag: 'product-details',
  styleUrl: 'product-details.css',
  shadow: true,
})
export class ProductDetails {
  @Prop() product: Product;

  render() {
    const { tagline, value_props } = this.product.body;

    return (
      <div>
        <h1 class="title" itemprop="tagline">
          {tagline}
        </h1>
        <ul class="value-prop-list" itemprop="description">
          {value_props.map(({ body, header }) => (
            <li class="value-prop" key={header}>
              <h3>{header}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        {/* TODO <image-gallery title="Screenshots" images={this.product.body.images} /> */}
      </div>
    );
  }
}
