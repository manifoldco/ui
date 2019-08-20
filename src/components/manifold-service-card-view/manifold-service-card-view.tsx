import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import logger from '../../utils/logger';

interface EventDetail {
  productId?: string;
  productLabel?: string;
  productName?: string;
}

@Component({
  tag: 'manifold-service-card-view',
  styleUrl: 'manifold-service-card-view.css',
  shadow: true,
})
export class ManifoldServiceCardView {
  @Prop() borderDisabled?: boolean = false;
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

  @logger()
  render() {
    const href =
      this.productLinkFormat && this.productLabel
        ? this.productLinkFormat.replace(/:product/gi, this.productLabel)
        : ''; // if no format, or product is loading, don’t calculate href

    return !this.skeleton ? (
      <a
        class="wrapper"
        href={href}
        itemprop="url"
        itemscope
        itemtype="https://schema.org/Product"
        onClick={this.onClick}
        role="button"
        data-border-disabled={this.borderDisabled}
      >
        <div class="grid">
          <div class="logo">
            <manifold-lazy-image src={this.logo} alt={this.name} itemprop="image" />
          </div>
          <h3 class="name" itemprop="name">
            {this.name}
          </h3>
          <div class="info">
            <p class="description" itemprop="description">
              {this.description}
            </p>
          </div>
          <div class="cta">
            <slot name="cta" />
          </div>
          <div class="tags">
            {this.isFeatured && <manifold-badge data-tag="featured">Featured</manifold-badge>}
            {this.isFree && <manifold-badge data-tag="free">Free</manifold-badge>}
          </div>
        </div>
      </a>
    ) : (
      // ☠
      <div class="wrapper" data-border-disabled={this.borderDisabled}>
        <div class="grid">
          <div class="logo">
            <manifold-skeleton-img />
          </div>
          <h3 class="name">
            <manifold-skeleton-text>{this.name}</manifold-skeleton-text>
          </h3>
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
