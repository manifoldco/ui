import { Component, Prop } from '@stencil/core';
import { Service } from 'types/Service';
import { themeIcons } from '../../assets/icons';

@Component({ tag: 'marketplace-results', styleUrl: 'marketplace-results.css', shadow: true })
export class ManifoldMarketplace {
  @Prop() featured?: string;
  @Prop() serviceLink?: string;
  @Prop() services: Service[];
  @Prop() themeColor: { [index: string]: string };
  @Prop() tag?: string;

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
      <div class="wrapper" style={this.themeColor}>
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
        {this.tag &&
          <service-card
            label={'bring-your-own'}
            logo={themeIcons[this.tag]}
            name={`Bring your own ${this.tag} service`}
            is-custom={true}
            is-featured={false}
          />
        }
      </div>
    );
  }
}
