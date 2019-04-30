import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { arrow_right, arrow_up_right, book, life_buoy } from '@manifoldco/icons';
import skeletonProduct from '../../data/product';
import { categoryIcon } from '../../utils/marketplace';

@Component({
  tag: 'manifold-product-page',
  styleUrl: 'manifold-product-page.css',
  shadow: true,
})
export class ManifoldProductPage {
  @Prop() hideCta?: boolean = false;
  @Prop() linkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() product?: Catalog.Product;
  @Prop() provider?: Catalog.Provider;
  @Event({
    eventName: 'manifold-productCTA-click',
    bubbles: true,
  })
  ctaClicked: EventEmitter;

  get ctaLink() {
    if (!this.product || !this.linkFormat) return undefined;
    return this.linkFormat.replace(/:product/gi, this.product.body.label);
  }

  get providerName() {
    if (!this.product || !this.provider) return undefined;
    return (
      (this.provider.body.name !== this.product.body.name && this.provider.body.name) || undefined
    );
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat || this.preserveEvent) {
      e.preventDefault();
      const label = this.product && this.product.body.label;
      this.ctaClicked.emit({ label });
    }
  };

  render() {
    if (this.product) {
      const { documentation_url, support_email, name, label, logo_url, tags } = this.product.body;
      const gradient = `var(--mf-g-${label})`;

      return (
        <div class="wrapper" itemscope itemtype="http://schema.org/Product">
          <section class="grid">
            <aside class="sidebar">
              <div class="sidebar-inner">
                <div class="sidebar-card" style={{ '--background-gradient': gradient }}>
                  <div class="product-logo">
                    <img src={logo_url} alt={name} itemprop="logo" />
                  </div>
                  <h2 class="product-name" itemprop="name">
                    {name}
                  </h2>
                  <p class="provider-name">
                    {this.providerName && <span itemprop="brand">from {this.providerName}</span>}
                  </p>
                </div>

                {this.hideCta !== true && (
                  <div class="sidebar-cta">
                    <manifold-link-button href={this.ctaLink} onClick={this.onClick}>
                      <span class="link-text">Get {name} Duis mollis, est non commodo luctus</span>
                      <manifold-icon icon={arrow_right} marginLeft />
                    </manifold-link-button>
                  </div>
                )}
                {tags && (
                  <div class="sidebar-section">
                    <h4>Category</h4>
                    {tags.map(tag => (
                      <div class="category" style={{ '--categoryColor': `var(--mf-c-${tag})` }}>
                        <manifold-icon
                          icon={categoryIcon[tag] || categoryIcon.uncategorized}
                          margin-right
                        />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                <div class="sidebar-section">
                  <h4>Links</h4>
                  <div class="provider-link">
                    <a href={documentation_url} target="_blank" rel="noopener noreferrer">
                      <manifold-icon icon={book} color="--mf-c-gray" margin-right />
                      Docs
                      <manifold-icon
                        class="external-link-icon"
                        icon={arrow_up_right}
                        color="--mf-c-gray-t3"
                        margin-left
                      />
                    </a>
                  </div>
                  <div class="provider-link">
                    <a href={`mailto:${support_email}`} target="_blank" rel="noopener noreferrer">
                      <manifold-icon icon={life_buoy} color="--mf-c-gray" margin-right />
                      Support
                      <manifold-icon
                        class="external-link-icon"
                        icon={arrow_up_right}
                        color="--mf-c-gray-t3"
                        margin-left
                      />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
            <manifold-product-details product={this.product} />
          </section>
        </div>
      );
    }

    // 💀
    const {
      body: { name },
    } = skeletonProduct;

    return (
      <div class="wrapper">
        <section class="grid">
          <aside class="sidebar">
            <div class="sidebar-inner">
              <div class="sidebar-card" style={{ '--background-gradient': 'var(--mf-g-default)' }}>
                <div class="product-logo">
                  <manifold-skeleton-img />
                </div>
                <h2 class="product-name" itemprop="name">
                  <manifold-skeleton-text>{name}</manifold-skeleton-text>
                </h2>
              </div>
              <div class="sidebar-section">
                <h4>Category</h4>
                <div class="category">
                  <manifold-skeleton-text>Database</manifold-skeleton-text>
                </div>
              </div>
            </div>
          </aside>
          <manifold-product-details />
        </section>
      </div>
    );
  }
}
