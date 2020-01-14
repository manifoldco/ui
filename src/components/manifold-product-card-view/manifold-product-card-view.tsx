// Newer version of <manifold-service-card-view>. Keep this in 1.0.
import { h, Component, Prop, Event, EventEmitter, Element } from '@stencil/core';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

interface EventDetail {
  productId?: string;
  productLabel?: string;
  productName?: string;
}

@Component({
  tag: 'manifold-product-card-view',
  styleUrl: 'manifold-product-card-view.css',
  shadow: true,
})
export class ManifoldProductCardView {
  @Element() el?: HTMLElement;
  @Prop() description?: string;
  @Prop() isFree?: boolean = false;
  @Prop() logo?: string;
  @Prop() name?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() productId?: string;
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() skeleton?: boolean = false;
  @Event({ eventName: 'manifold-marketplace-click', bubbles: true }) marketplaceClick: EventEmitter;
  @Prop({ reflect: true }) isFeatured?: boolean;

  onClick = (e: Event): void => {
    if (!this.productLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        productId: this.productId,
        productLabel: this.productLabel,
        productName: this.name,
      };
      this.marketplaceClick.emit(detail);
    }
  };

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    const href =
      this.productLinkFormat && this.productLabel
        ? this.productLinkFormat.replace(/:product/gi, this.productLabel)
        : ''; // if no format, or product is loading, don’t calculate href

    const slots = this.el ? Array.from(this.el.children).map(child => child.slot) : [];

    return !this.skeleton ? (
      <a
        class="wrapper"
        href={href}
        itemprop="url"
        itemscope
        itemtype="https://schema.org/Product"
        onClick={this.onClick}
        role="button"
      >
        <div class="grid">
          <div class="logo">
            <img
              src={this.logo}
              alt={this.name}
              itemprop="image"
              loading="lazy"
              width="48"
              height="48"
            />
          </div>
          <h3 class="name" itemprop="name">
            {this.name}
          </h3>
          <p class="description" itemprop="description">
            {this.description}
          </p>
          {slots.includes('cta') && (
            <div class="cta">
              <slot name="cta" />
            </div>
          )}
          {(this.isFeatured || this.isFree) && (
            <div class="tags">
              {this.isFeatured && <manifold-badge data-tag="featured">Featured</manifold-badge>}
              {this.isFree && <manifold-badge data-tag="free">Free</manifold-badge>}
            </div>
          )}
        </div>
      </a>
    ) : (
      // ☠
      <div class="wrapper">
        <div class="grid">
          <div class="logo">
            <manifold-skeleton-img />
          </div>
          <h3 class="name">
            <manifold-skeleton-text>{this.name}</manifold-skeleton-text>
          </h3>
          <div class="loading-cta">
            <slot name="cta" />
          </div>
          <div class="info">
            <p class="description">
              <manifold-skeleton-text>{this.description}</manifold-skeleton-text>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
