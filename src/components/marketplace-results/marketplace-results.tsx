import { Component, Prop } from '@stencil/core';

@Component({ tag: 'marketplace-results', styleUrl: 'marketplace-results.css' })
export class ManifoldMarketplace {
  @Prop() featured?: string;
  @Prop() serviceLink?: string;
  @Prop() services: Catalog.Product[];

  private formatHref(label: string): string {
    if (typeof label !== 'string') return '';
    if (!this.serviceLink) return '';
    return this.serviceLink.replace(':service', label);
  }

  private isFeatured(label: string) {
    if (typeof this.featured !== 'string') return false;
    const parsedFeatures = this.featured.split(',').map(featureList => featureList.trim());
    return parsedFeatures.includes(label);
  }

  render() {
    return (
      <div class="results-grid">
        {this.services
          .sort((a, b) => a.body.name.localeCompare(b.body.name))
          .map(({ body: { name, label, tagline, logo_url } }) => (
            <service-card
              description={tagline}
              label={label}
              logo={logo_url}
              name={name}
              service-link={this.formatHref(label)}
              is-featured={this.isFeatured(label)}
            />
          ))}
        <slot name="custom-card" />
      </div>
    );
  }
}
