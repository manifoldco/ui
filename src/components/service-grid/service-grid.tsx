import { Component, Prop } from '@stencil/core';
import { Service } from 'types/Service';

@Component({
  tag: 'service-grid',
  styleUrl: 'service-grid.css',
  shadow: true,
})
export class ManifoldMarketplace {
  @Prop() featured?: string;
  @Prop() themeColor: { [index: string]: string };
  @Prop() serviceLink?: string;
  @Prop() services?: Service[];

  private isFeatured(label: string) {
    if (typeof this.featured !== 'string') return false;
    const parsedFeatures = this.featured.split(',').map(featureList => featureList.trim());
    return parsedFeatures.includes(label);
  }

  private formatHref(label: string): string {
    if (typeof label !== 'string') return '';
    if (!this.serviceLink) return `#${label}`;
    return this.serviceLink.replace(':service', label);
  }

  render() {
    return (
      <div class="wrapper" style={this.themeColor}>
        {Array.isArray(this.services) &&
          this.services.map(({ body: { name, label, tagline, logo_url } }) => (
            <service-card
              description={tagline}
              label={label}
              logo={logo_url}
              name={name}
              service-link={this.formatHref(label)}
              is-featured={this.isFeatured(label)}
            />
          ))}
      </div>
    );
  }
}
