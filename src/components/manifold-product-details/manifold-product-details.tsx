import { h, Component, Prop } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import skeletonProduct from '../../data/product';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-product-details',
  styleUrl: 'manifold-product-details.css',
  shadow: true,
})
export class ManifoldProductDetails {
  @Prop() product?: Catalog.Product;

  @logger()
  render() {
    const {
      body: { tagline, value_props, images = [] },
    } = this.product || skeletonProduct;

    if (this.product) {
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
          {images.length > 0 && (
            <manifold-image-gallery images={images}>Screenshots</manifold-image-gallery>
          )}
        </div>
      );
    }

    // 💀

    return (
      <div>
        <h1 class="title" itemprop="tagline">
          <span class="tagline">
            <manifold-skeleton-text>{tagline}</manifold-skeleton-text>
          </span>
        </h1>
        <ul class="value-prop-list" itemprop="description">
          {value_props.map(({ body, header }) => (
            <li class="value-prop" key={header}>
              <h3>
                <manifold-skeleton-text>{header}</manifold-skeleton-text>
              </h3>
              <p>
                <manifold-skeleton-text>{body}</manifold-skeleton-text>
              </p>
            </li>
          ))}
        </ul>
        <manifold-image-gallery title="Screenshots" />
      </div>
    );
  }
}
