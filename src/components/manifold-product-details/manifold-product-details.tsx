import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-product-details',
  styleUrl: 'product-details.css',
  shadow: true,
})
export class ManifoldProductDetails {
  @Prop() product?: Catalog.ExpandedProduct;

  render() {
    if (!this.product) return null;

    const { tagline, value_props, images = [] } = this.product.body;

    return (
      <div>
        <h1 class="title" itemprop="tagline">
          <span class="tagline">{tagline}</span>
        </h1>
        <ul class="value-prop-list" itemprop="description">
          {value_props.map(({ body, header }) => (
            <li class="value-prop" key={header}>
              <h3>{header}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        {images.length > 0 && <manifold-image-gallery title="Screenshots" images={images} />}
      </div>
    );
  }
}
