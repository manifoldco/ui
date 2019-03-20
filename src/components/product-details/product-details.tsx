import { Component, Prop } from '@stencil/core';

const RESOURCE_CREATE = '/resource/create?product='; // TODO get actual url

@Component({
  tag: 'product-details',
  styleUrl: 'product-details.css',
  shadow: true,
})
export class ProductDetails {
  @Prop() product: Catalog.ExpandedProduct;

  render() {
    const { label, name, tagline, value_props } = this.product.body;

    return (
      <div>
        <h1 class="title" itemprop="tagline">
          {tagline}
          <link-button
            href={`${RESOURCE_CREATE}${label}&plan=${'selectedPlan'}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Get {name}
            <mf-icon icon="arrow_right" marginLeft />
          </link-button>
        </h1>
        <ul class="value-prop-list" itemprop="description">
          {value_props.map(({ body, header }) => (
            <li class="value-prop" key={header}>
              <h3>{header}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        <image-gallery title="Screenshots" images={this.product.body.images} />
      </div>
    );
  }
}
