import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { themeIcons } from '../../assets/icons';

@Component({
  tag: 'manifold-product-page',
  styleUrl: 'product-page.css',
  shadow: true,
})
export class ManifoldProductPage {
  @Prop() linkFormat?: string;
  @Prop() product?: Catalog.ExpandedProduct;
  @Prop() provider?: Catalog.Provider;
  @Event({
    eventName: 'manifold-productCTA-click',
    bubbles: true,
  }) ctaClicked: EventEmitter;

  get ctaLink() {
    if (!this.product) return undefined;
    if (typeof this.linkFormat !== 'string') return undefined;
    return this.linkFormat.replace(/:product/ig, this.product.body.label);
  }

  get providerName() {
    if (!this.product || !this.provider) return undefined;
    return (this.provider.body.name !== this.product.body.name && this.provider.body.name) || undefined;
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat) {
      e.preventDefault();
      const label = this.product && this.product.body.label;
      this.ctaClicked.emit({ label });
    }
  };

  renderSidebar = () => {
    if (!this.product) {
      return null;
    }

    const { label, name, logo_url, tags, support_email, documentation_url } = this.product.body;

    return (
      <aside class="sidebar">
        <div class="sidebar-inner">
          <manifold-featured-service
            name={name}
            logo={logo_url}
            productGradient={`var(--mf-g-${label})`}
          >
            {this.providerName && `from ${this.providerName}`}
          </manifold-featured-service>
          <div class="sidebar-cta">
            <manifold-link-button
              href={this.ctaLink}
              onClick={this.onClick}
              rel={this.ctaLink && 'noopener noreferrer'}
              target={this.ctaLink && '_blank'}
            >
              Get {name}
              <manifold-icon icon="arrow_right" marginLeft />
            </manifold-link-button>
          </div>
          {tags && (
            <div class="sidebar-section">
              <h4>Category</h4>
              {tags.map(tag => (
                <div class="category" style={{ '--categoryColor': `var(--mf-c-${tag})` }}>
                  <manifold-icon icon={themeIcons[tag] || themeIcons.uncategorized} margin-right />
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div class="sidebar-section">
            <h4>Links</h4>
            <div class="provider-link">
              <a href={documentation_url} target="_blank" rel="noopener noreferrer">
                <manifold-icon icon="book" color="--mf-c-gray" margin-right />
                Docs
                <manifold-icon
                  class="external-link-icon"
                  icon="arrow_up_right"
                  color="--mf-c-grayLight"
                  margin-left
                />
              </a>
            </div>
            <div class="provider-link">
              <a href={`mailto:${support_email}`} target="_blank" rel="noopener noreferrer">
                <manifold-icon icon="life_buoy" color="--mf-c-gray" margin-right />
                Support
                <manifold-icon
                  class="external-link-icon"
                  icon="arrow_up_right"
                  color="--mf-c-grayLight"
                  margin-left
                />
              </a>
            </div>
          </div>
          {/* TODO badges */}
        </div>
      </aside>
    );
  };

  render() {
    return (
      <div class="wrapper" itemscope itemtype="http://schema.org/Product">
        <section class="grid">
          {this.renderSidebar()}
          <manifold-product-details product={this.product} />
        </section>
      </div>
    );
  }
}
