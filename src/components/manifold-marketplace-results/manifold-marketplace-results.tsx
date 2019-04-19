import { Component, Prop } from '@stencil/core';

@Component({ tag: 'manifold-marketplace-results', styleUrl: 'marketplace-results.css' })
export class ManifoldMarketplace {
  @Prop() featured: string[] = [];
  @Prop() linkFormat?: string;
  @Prop() services: Catalog.Product[] = [];

  private formatHref(label: string): string {
    if (typeof label !== 'string') return '';
    if (!this.linkFormat) return '';
    return this.linkFormat.replace(/:product/gi, label);
  }

  private isFeatured(label: string) {
    return this.featured.map(product => product.toLowerCase()).includes(label);
  }

  render() {
    return (
      <div class="results-grid">
        {this.services
          .sort((a, b) => a.body.name.localeCompare(b.body.name))
          .map(({ id, body: { name, label, tagline, logo_url } }) => (
            <manifold-service-card
              description={tagline}
              isFeatured={this.isFeatured(label)}
              label={label}
              logo={logo_url}
              name={name}
              productId={id}
              linkFormat={this.formatHref(label)}
            />
          ))}
        <slot name="custom-card" />
      </div>
    );
  }
}
