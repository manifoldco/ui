import { h, Component, Prop } from '@stencil/core';
import { arrow_up_right, book, life_buoy, file_text } from '@manifoldco/icons';
import { Product } from '../../types/graphql';
import skeletonProduct from '../../data/product';
import { categoryIcon } from '../../utils/marketplace';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-product-page',
  styleUrl: 'manifold-product-page.css',
  shadow: true,
})
export class ManifoldProductPage {
  @Prop() product?: Product;

  get providerName() {
    if (!this.product) {
      return undefined;
    }
    return this.product.provider && this.product.provider.displayName;
  }

  @logger()
  render() {
    if (this.product) {
      const {
        documentationUrl,
        supportEmail,
        displayName,
        label,
        logoUrl,
        categories,
        termsUrl,
      } = this.product;
      const gradient = `var(--manifold-g-${label}, var(--manifold-g-default))`;

      return (
        <div itemscope itemtype="http://schema.org/Product">
          <section class="grid">
            <aside class="sidebar">
              <div class="sidebar-card" style={{ '--background-gradient': gradient }}>
                <div class="product-logo">
                  <img src={logoUrl} alt={displayName} itemprop="logo" />
                </div>
                <h2 class="product-name" itemprop="name">
                  {displayName}
                </h2>
                <p class="provider-name">
                  {this.providerName && <span itemprop="brand">from {this.providerName}</span>}
                </p>
              </div>
              <div class="sidebar-cta">
                <slot name="cta" />
              </div>
              {categories && (
                <div class="sidebar-section">
                  <h4>Category</h4>
                  {categories.map(category => (
                    <div class="category" style={{ '--categoryColor': `var(--manifold-c-${category.label})` }}>
                      <manifold-icon
                        icon={categoryIcon[category.label] || categoryIcon.uncategorized}
                        margin-right
                      />
                      {category.label}
                    </div>
                  ))}
                </div>
              )}
              <div class="sidebar-section">
                <h4>Links</h4>
                <div class="provider-link">
                  <a href={documentationUrl} target="_blank" rel="noopener noreferrer">
                    <manifold-icon icon={book} margin-right />
                    Docs
                    <manifold-icon class="external-link-icon" icon={arrow_up_right} margin-left />
                  </a>
                </div>
                <div class="provider-link">
                  <a href={`mailto:${supportEmail}`} target="_blank" rel="noopener noreferrer">
                    <manifold-icon icon={life_buoy} margin-right />
                    Support
                    <manifold-icon class="external-link-icon" icon={arrow_up_right} margin-left />
                  </a>
                </div>
                {termsUrl && (
                  <div class="provider-link">
                    <a href={termsUrl} target="_blank" rel="noopener noreferrer">
                      <manifold-icon icon={file_text} margin-right />
                      Terms of service
                      <manifold-icon class="external-link-icon" icon={arrow_up_right} margin-left />
                    </a>
                  </div>
                )}
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
      <section class="grid">
        <aside class="sidebar">
          <div
            class="sidebar-card"
            style={{ '--background-gradient': 'var(--manifold-g-default)' }}
          >
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
        </aside>
        <manifold-product-details />
      </section>
    );
  }
}
