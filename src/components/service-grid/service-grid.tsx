import { Component, Prop, State, Element } from '@stencil/core';
import { Service } from 'types/Service';

import { themeIcons } from '../../assets/icons';

type CategoryMap = {
  [category: string]: Service[];
};

@Component({ tag: 'service-grid', styleUrl: 'service-grid.css', shadow: true })
export class ServiceGrid {
  @Element() root: HTMLElement;
  @Prop() featured?: string;
  @Prop() themeColor: { [index: string]: string };
  @Prop() serviceLink?: string;
  @Prop() services?: Service[];
  @State() observer: IntersectionObserver;
  @State() activeCategory?: string;
  @State() scrollToCategory: string | null;
  @State() filter: string | null;

  componentWillLoad() {
    this.observer = new IntersectionObserver(this.observe, {
      root: null,
      threshold: 1.0,
    });
  }

  componentDidUpdate() {
    if (this.scrollToCategory) {
      if (this.root.shadowRoot) {
        const heading = this.root.shadowRoot.querySelector(`#category-${this.scrollToCategory}`);

        if (heading) {
          heading.scrollIntoView({ behavior: 'smooth' });
        }
      }

      this.scrollToCategory = null;
    }
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
    this.filter = '';
    if (e.srcElement) {
      const category = e.srcElement.getAttribute('data-category');
      this.scrollToCategory = category;
    }
  };

  private observeCategory = (el?: HTMLElement) => {
    if (el) {
      this.observer.observe(el);
    }
  };

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

  private updateFilter = (e: KeyboardEvent): void => {
    if (e.srcElement) {
      this.filter = (e.srcElement as HTMLInputElement).value;
    }
  };

  private filteredServices() {
    if (!this.filter || !this.services) {
      return [];
    }

    const searchTerm = this.filter.toLocaleLowerCase();
    return this.services.filter(s => {
      const searchTargets = [s.body.label, s.body.name.toLocaleLowerCase()].concat(
        s.body.tags || []
      );
      return searchTargets.some(t => t.includes(searchTerm));
    });
  }

  render() {
    const categoryMap = this.categories();
    const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));

    return (
      <div class="wrapper">
        <input
          class="search-bar"
          type="search"
          placeholder="Search for a service or category"
          value={this.filter || ''}
          onKeyUp={this.updateFilter}
        />
        <div class={'browse-catalog'}>
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
          <div class="sorted-categories">
            {this.filter ? (
              <marketplace-results
                services={this.filteredServices()}
                featured={this.featured}
                service-link={this.serviceLink}
                themeColor={this.themeColor}
              />
            ) : (
              sortedCategories.map(tag => (
                <div>
                  <h3 class="category" id={`category-${tag}`} ref={this.observeCategory}>
                    <mf-icon icon={themeIcons[tag]} marginRight />
                    {this.formatCategoryLabel(tag)}
                  </h3>
                  <marketplace-results
                    services={categoryMap[tag]}
                    featured={this.featured}
                    service-link={this.serviceLink}
                    themeColor={this.themeColor}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
