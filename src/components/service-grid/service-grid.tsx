import { Component, Prop } from '@stencil/core';
import { Service } from 'types/Service';

type CategoryMap = {
  [category: string]: Service[];
};

@Component({ tag: 'service-grid', styleUrl: 'service-grid.css', shadow: true })
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

  private formatCategoryLabel(tag: string): string {
    switch (tag) {
      case 'cms':
        return 'CMS';
      case 'ai-ml':
        return 'AI/ML';
      default:
        return tag.replace('-', ' ');
    }
  }

  private categories(): CategoryMap {
    const categoryMap: CategoryMap = {};

    if (Array.isArray(this.services)) {
      this.services.forEach(service => {
        const tags = service.body.tags || [];
        tags.forEach(tag => {
          categoryMap[tag] = categoryMap[tag] || [];
          categoryMap[tag].push(service);
        });

        return {};
      });
    }

    return categoryMap;
  }

  render() {
    const categoryMap = this.categories();
    const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));

    console.log(sortedCategories, categoryMap);
    return sortedCategories.map(tag => (
      <div>
        <h3 class="category">{this.formatCategoryLabel(tag)}</h3>
        <div class="wrapper" style={this.themeColor}>
          {categoryMap[tag]
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
        </div>
      </div>
    ));
  }
}
