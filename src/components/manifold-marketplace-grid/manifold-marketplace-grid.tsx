import { Component, Prop, State, Element } from '@stencil/core';
import serviceTemplates from '../../data/templates';
import {
  categories,
  categoryIcon,
  formatCategoryLabel,
  filteredServices,
} from '../../utils/marketplace';

@Component({
  tag: 'manifold-marketplace-grid',
  styleUrl: 'manifold-marketplace-grid.css',
  shadow: true,
})
export class ManifoldMarketplaceGrid {
  @Element() el: HTMLElement;
  @Prop() blacklist?: string[] = [];
  @Prop() featured?: string[] = [];
  @Prop() hideCategories?: boolean = false;
  @Prop() hideTemplates?: boolean = false;
  @Prop() linkFormat?: string;
  @Prop() services?: Catalog.Product[] = [];
  @Prop() whitelist?: string[] = [];
  @State() filter: string | null;
  @State() activeCategory?: string;
  @State() observer: IntersectionObserver;
  @State() scrollToCategory: string | null;
  @State() search: string = '';

  componentWillLoad() {
    if (!this.hideCategories)
      this.observer = new IntersectionObserver(this.observe, {
        root: null,
        threshold: 0.9,
      });
  }

  componentDidUpdate() {
    if (this.scrollToCategory) {
      if (this.el.shadowRoot) {
        const heading = this.el.shadowRoot.querySelector(`#category-${this.scrollToCategory}`);
        if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.scrollToCategory = null;
    }
  }

  get categories(): string[] {
    if (this.hideCategories) return [];
    const categoryList: string[] = [];

    // Iterate through services, only add unique categories
    this.filteredServices.forEach(({ body: { tags } }: Catalog.Product) => {
      if (!Array.isArray(tags)) return;
      tags.forEach(tag => {
        if (!categoryList.includes(tag)) categoryList.push(tag);
      });
    });

    // Skip template-only categories if hiding custom
    if (!this.hideTemplates) {
      serviceTemplates.forEach(({ category }) => {
        if (!categoryList.includes(category)) categoryList.push(category);
      });
    }

    // Return sorted alphabetically
    return [...categoryList].sort((a, b) => a.localeCompare(b));
  }

  get filteredServices(): Catalog.Product[] {
    let services: Catalog.Product[] = [];
    // If not whitelisting, start out with all services
    if (this.whitelist && !this.whitelist.length && this.services) services = this.services; // eslint-disable-line prefer-destructuring

    // Handle whitelist
    if (Array.isArray(this.whitelist))
      this.whitelist.forEach(whitelisted => {
        const service =
          this.services && this.services.find(({ body: { label } }) => label === whitelisted);
        if (service) services.push(service);
      });

    // Handle blacklist
    if (Array.isArray(this.blacklist))
      services = services.filter(
        ({ body: { label } }) => this.blacklist && !this.blacklist.includes(label)
      );

    // Handle search
    if (this.filter && this.filter.length) services = filteredServices(this.filter, services);

    return services;
  }

  get showCategories(): boolean {
    // Hide categories if searching
    if (this.filter) return false;
    // Else, hide categories if hide-categories is specified
    return !this.hideCategories;
  }

  private categoryClick = (category: string, e: Event) => {
    this.scrollToCategory = category;
    this.filter = '';
    e.preventDefault();
  };

  private categorizedServices(category: string): Catalog.Product[] {
    return categories(this.filteredServices)[category] || [];
  }

  private handleSearch = (el?: HTMLElement) => {
    if (!el) return;
    el.addEventListener('search', (e: Event) => {
      const val = (e.srcElement as HTMLInputElement).value;
      if (!val) this.filter = '';
    });
  };

  private updateFilter = (e: KeyboardEvent): void => {
    if (e.srcElement) this.filter = (e.srcElement as HTMLInputElement).value;
  };

  private observe = (
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ): void => {
    const visibleEntry = entries.find(e => e.isIntersecting && e.intersectionRatio > 0.99);
    if (visibleEntry) {
      // Grab everything after first hyphen
      const category = visibleEntry.target.id.replace('category-', '');
      this.activeCategory = category;
    }
  };

  private observeCategory = (el?: HTMLElement) => {
    if (el) this.observer.observe(el);
  };

  private renderServiceCard = ({
    id,
    body: { name, tagline, label, logo_url },
  }: Catalog.Product) => (
    <manifold-service-card
      data-label={label}
      description={tagline}
      isFeatured={this.featured && this.featured.includes(label)}
      label={label}
      linkFormat={this.linkFormat}
      logo={logo_url}
      name={name}
      productId={id}
    />
  );

  render() {
    return (
      <div class="wrapper" data-categorized={this.showCategories}>
        <input
          class="search"
          type="search"
          autocapitalize="off"
          placeholder="Search for a service or category"
          value={this.filter || ''}
          onKeyUp={this.updateFilter}
          ref={this.handleSearch}
        />
        <aside class="category-list" data-categorized={this.showCategories}>
          <div class="category-list-scroll">
            {this.categories.map(category => (
              <a
                class="category-list-button"
                data-active={this.activeCategory === category}
                href={`#category-${category}`}
                onClick={e => this.categoryClick(category, e)}
              >
                {formatCategoryLabel(category)}
              </a>
            ))}
          </div>
        </aside>
        <div class="service-grid" data-categorized={this.showCategories}>
          {this.showCategories
            ? this.categories.map(category => [
                <h1 id={`category-${category}`} class="category-heading" ref={this.observeCategory}>
                  <manifold-icon icon={categoryIcon[category]} />
                  {formatCategoryLabel(category)}
                </h1>,
                this.categorizedServices(category).map(service => this.renderServiceCard(service)),
                !this.hideTemplates && (
                  <manifold-template-card category={category} linkFormat={this.linkFormat} />
                ),
              ])
            : this.filteredServices.map(service => this.renderServiceCard(service))}
          {this.filteredServices.length === 0 && <manifold-toast>No services found</manifold-toast>}
        </div>
      </div>
    );
  }
}
