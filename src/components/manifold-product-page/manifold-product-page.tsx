import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'manifold-product-page',
  styleUrl: 'product-page.css',
  shadow: true,
})
export class ManifoldProductPage {
  @Prop() product?: Catalog.ExpandedProduct;
  @Prop() provider?: Catalog.Provider;

  get providerName() {
    if (!this.product || !this.provider) return undefined;
    return (this.provider.body.name !== this.product.body.name && this.provider.body.name) || undefined;
  }

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
          {tags && (
            <div class="sidebar-section">
              {tags.map(tag => (
                <div class="category" style={{ '--categoryColor': `var(--mf-c-${tag})` }}>
                  <manifold-icon icon={tag} margin-right />
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div class="sidebar-section">
            <h4>Provider Links</h4>
            <div class="provider-link">
              <a href="#plan_pricing">
                <manifold-icon icon="dollar_sign" color="--mf-c-gray" margin-right />
                Pricing
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
            <div class="provider-link">
              <a href={documentation_url} target="_blank" rel="noopener noreferrer">
                <manifold-icon icon="book" color="--mf-c-gray" margin-right />
                Documentation
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
