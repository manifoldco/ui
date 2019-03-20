import { Component, State, Element } from '@stencil/core';

import { CategoryButtons } from './category-buttons';
import { Collections } from './collections';
import { FilteredServices } from './filtered-services';

enum Tab {
  Featured = 'featured',
  Categorized = 'categorized',
}

@Component({ tag: 'service-grid', styleUrl: 'service-grid.css', shadow: true })
export class ServiceGrid {
  @Element() root: HTMLElement;
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
    if (e.srcElement) {
      const category = e.srcElement.getAttribute('data-category');
      this.scrollToCategory = category;
    }

    this.activeTab = Tab.Categorized;
    this.filter = '';
  };

  private observeCategory = (el?: HTMLElement) => {
    if (el) {
      this.observer.observe(el);
    }
  };

  private updateFilter = (e: KeyboardEvent): void => {
    if (e.srcElement) {
      this.filter = (e.srcElement as HTMLInputElement).value;
      this.activeTab = Tab.Categorized;
    }
  };

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
      if (this.root.shadowRoot) {
        const el = this.root.shadowRoot.querySelector('#results');
        if (el) {
          el.scrollIntoView();
        }
      }

      this.activeCategory = undefined;
      this.filter = null;
    }
  };

  tab(tabName: Tab, label: string) {
    const className = `category-button big${this.activeTab === tabName ? ' is-active' : ''}`;
    return (
      <button id={tabName} class={className} onClick={this.switchTab(tabName)}>
        {label}
      </button>
    );
  }

  render() {
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
              <CategoryButtons
                activeCategory={this.activeCategory}
                categoryClick={this.categoryClick}
              />
            </div>
          </aside>
          <div id="results">
            <div class="results">
              {this.activeTab === Tab.Categorized ? (
                <div class="sorted-categories">
                  {this.filter ? (
                    <FilteredServices filter={this.filter} />
                  ) : (
                    <sorted-categories observeCategory={this.observeCategory} />
                  )}
                </div>
              ) : (
                <Collections />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
