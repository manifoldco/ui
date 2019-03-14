import { Component, Prop, State, Element } from '@stencil/core';
import { Service } from 'types/Service';

import { MarketplaceCollection } from '../marketplace-collection/marketplace-collection';
import { themeIcons } from '../../assets/icons';

type CategoryMap = {
  [category: string]: Service[];
};

enum Tab {
  Featured = 'featured',
  Categorized = 'categorized',
}

@Component({ tag: 'service-grid', styleUrl: 'service-grid.css', shadow: true })
export class ServiceGrid {
  @Element() root: HTMLElement;
  @Prop() featured?: string;
  @Prop() serviceLink?: string;
  @Prop() services?: Service[];
  @State() observer: IntersectionObserver;
  @State() activeCategory?: string;
  @State() scrollToCategory: string | null;
  @State() filter: string | null;
  @State() activeTab: Tab = Tab.Featured;

  componentWillLoad() {
    this.observer = new IntersectionObserver(this.observe, {
      root: null,
      threshold: 0.9,
    });
  }

  componentDidUpdate() {
    if (this.scrollToCategory) {
      if (this.root.shadowRoot) {
        const heading = this.root.shadowRoot.querySelector(`#category-${this.scrollToCategory}`);

        if (heading) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      this.scrollToCategory = null;
    }
  }

  private observe = (
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ): void => {
    const visibleEntry = entries.find(e => e.isIntersecting && e.intersectionRatio > 0.99);
    if (visibleEntry) {
      const [, ...rest] = visibleEntry.target.id.split('-');
      const category = rest.join('-');
      this.activeCategory = category;
    }
  };

  private categoryClick = (e: MouseEvent) => {
    this.filter = '';
    this.activeTab = Tab.Categorized;
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

  private handleSearch = (el?: HTMLElement) => {
    if (el) {
      el.addEventListener('search', (e: Event) => {
        const val = (e.srcElement as HTMLInputElement).value;
        if (!val) {
          this.filter = '';
        }
      });
    }
  };

  switchTab = (tabName: Tab) => () => {
    this.activeTab = tabName;

    if (tabName === Tab.Featured && this.root.shadowRoot) {
      this.scrollToCategory = 'collection-new';
    }
  };

  tab(tabName: Tab, label: string) {
    const className = `category-button big${this.activeTab === tabName ? ' is-active' : ''}`;
    return (
      <button class={className} onClick={this.switchTab(tabName)}>
        {label}
      </button>
    );
  }

  render() {
    const categoryMap = this.categories();
    const sortedCategories = Object.keys(categoryMap).sort((a, b) => a.localeCompare(b));

    return (
      <div class="wrapper">
        <input
          class="search-bar"
          type="search"
          autocapitalize="off"
          placeholder="Search for a service or category"
          value={this.filter || ''}
          onKeyUp={this.updateFilter}
          ref={this.handleSearch}
        />
        <div class={'browse-catalog'}>
          <aside class="category-sidebar">
            <div class="category-sidebar-inner">
              {this.tab(Tab.Featured, 'Featured')}
              {this.tab(Tab.Categorized, 'All Services')}
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
          {this.activeTab === Tab.Categorized ? (
            <div class="sorted-categories">
              {this.filter ? (
                <marketplace-results
                  services={this.filteredServices()}
                  featured={this.featured}
                  service-link={this.serviceLink}
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
                    >
                      <service-card
                        description={`Add your own ${this.formatCategoryLabel(tag)} service`}
                        label={'bring-your-own'}
                        logo={themeIcons[tag]}
                        name={`Bring your own ${this.formatCategoryLabel(tag)} service`}
                        is-custom={true}
                        is-featured={false}
                        slot="custom-card"
                      />
                    </marketplace-results>
                  </div>
                ))
              )}
            </div>
          ) : (
            <MarketplaceCollection labels={['till']} title="New" name="new" />
          )}
        </div>
      </div>
    );
  }
}
