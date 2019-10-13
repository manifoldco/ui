import { h, Component, Prop } from '@stencil/core';

import { Product } from '../../types/graphql';
import skeletonProduct from '../../data/product';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-product-details',
  styleUrl: 'manifold-product-details.css',
  shadow: true,
})
export class ManifoldProductDetails {
  @Prop() product?: Product;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (this.product) {
      const { images, tagline, valueProps } = this.product;
      return (
        <div>
          <h1 class="title" itemprop="tagline">
            <span class="tagline">{tagline}</span>
          </h1>
          <ul class="value-prop-list" itemprop="description">
            {valueProps &&
              valueProps.map(({ body, header }) => (
                <li class="value-prop" key={header}>
                  <h3>{header}</h3>
                  <p>{body}</p>
                </li>
              ))}
          </ul>
          {images && images.length > 0 && (
            <manifold-image-gallery images={images}>Screenshots</manifold-image-gallery>
          )}
        </div>
      );
    }

    // 💀
    const {
      body: { tagline, value_props },
    } = skeletonProduct;
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
