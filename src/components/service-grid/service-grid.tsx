import { Component, Prop, State, Element } from '@stencil/core';
import { Service } from 'types/Service';

import { themeIcons } from '../../assets/icons';

type CategoryMap = {
  [category: string]: Service[];
};

@Component({ tag: 'service-grid', styleUrl: 'service-grid.css', shadow: true })
export class ManifoldMarketplace {
  @Element() root: HTMLElement;
  @Prop() featured?: string;
  @Prop() themeColor: { [index: string]: string };
  @Prop() serviceLink?: string;
  @Prop() services?: Service[];
  @Prop() showCategoryMenu: boolean = false;
  @State() observer: IntersectionObserver;
  @State() activeCategory?: string;

  componentWillLoad() {
    this.observer = new IntersectionObserver(this.observe, {
      root: null,
      threshold: 1.0,
    });
  }

  private observe = (
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ): void => {
    const visibleEntry = entries.find(e => e.isIntersecting);
    if (visibleEntry) {
      const [, ...rest] = visibleEntry.target.id.split('-');
      const category = rest.join('-');
      this.activeCategory = category;
    }
  };

  private categoryClick = (e: MouseEvent) => {
    if (e.srcElement) {
      const category = e.srcElement.getAttribute('data-category');

      if (this.root.shadowRoot) {
        const heading = this.root.shadowRoot.querySelector(`#category-${category}`);

        if (heading) {
          heading.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  private observeCategory = (el?: HTMLElement) => {
    if (el) {
      this.observer.observe(el);
    }
  };

  private isFeatured(label: string) {
    if (typeof this.featured !== 'string') return false;
    const parsedFeatures = this.featured.split(',').map(featureList => featureList.trim());
    return parsedFeatures.includes(label);
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
        const tags = service.body.tags || ['uncategorized'];
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

    return (
      <div class={this.showCategoryMenu ? 'browse-catalog' : ''}>
        {this.showCategoryMenu && (
          <aside class="category-sidebar">
            <div class="category-sidebar-inner">
              {sortedCategories.map(tag => (
                <button
                  class={`category-button${this.activeCategory === tag ? ' is-active' : ''}`}
                  onClick={this.categoryClick}
                  data-category={tag}
                >
                  {this.formatCategoryLabel(tag)}
                </button>
              ))}
            </div>
          </aside>
        )}
        <div class="sorted-categories">
          {sortedCategories.map(tag => (
            <div>
              <h3 class="category" id={`category-${tag}`} ref={this.observeCategory}>
                <mf-icon icon={themeIcons[tag]} marginRight />
                {this.formatCategoryLabel(tag)}
              </h3>
              <marketplace-results
                services={categoryMap[tag]}
                is-featured={this.isFeatured}
                service-link={this.serviceLink}
                themeColor={this.themeColor}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
