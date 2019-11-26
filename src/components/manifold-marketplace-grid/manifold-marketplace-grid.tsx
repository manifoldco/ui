import { h, Component, Prop, State, Element } from '@stencil/core';
import observeRect from '@reach/observe-rect';

import { ProductEdge, PlanConnection, Product } from '../../types/graphql';
import serviceTemplates from '../../data/templates';
import { categoryIcon, formatCategoryLabel } from '../../utils/marketplace';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { filteredServices, categories } from './utils';

/*
 * The first phase of the GraphQL conversion involves fetching all pages
 * from the API and leaving the UI unchanged. Thus, the strategy with the
 * least amount of impact is to use the products query, rather than the
 * categories query. This allows us to pass data to marketplace-grid that
 * has a close mapping to what we gave it from the REST API. Most of the logic
 * for filtering and categorizing occurs in the marketplace-grid, so by leaving
 * the structure similar, we only have to make small changes in how we access the
 * data, rather than overhauling the actual logic required to filter and categorize.
 *
 * My long term thoughts on how this component should work will ultimately depend
 * on what the design team decides, but the API seems to suggest a reasonable and
 * fairly common interface, which I'll describe now.
 *
 * The categorized view would be driven by the categories query, which contains one
 * page of products for each category. So the first data load contains one page of
 * categories, and for each of these, we display the first page of product data in
 * the grid, using a page size that we think is a reasonable maximum. If we need
 * to fetch more pages of categories, this could be done eagerly, or on demand as a
 * result of the user scrolling.
 *
 * Within each category, if the pageInfo for the first page of product data
 * indicates that it has more products, we could present a "See All" indicator.
 * It could be like a custom service card that says "See All <category>". Clicking
 * on that card would then present a grid that talks to the API to display the
 * products in that category. This would use a larger page size for products and
 * would load subsequent pages as a result of the user scrolling. Filtering should
 * be enabled in this interface, and should submit a filter and category label to
 * the API, which may not yet be supported by GraphQL, so we'll have to ask for it
 * if it's not. The filter would be debounced, and if needed, we can cache results
 * using the filter value as a key. In this view, I could see the category menu
 * either being disabled or remaining enabled. If it is enabled, clicking a
 * different category would continue to present the 'all-products' interface for
 * the new category.
 *
 * Filtering within the category view would also submit to the API, but it would
 * not submit a category label. This will present products as it does today, but
 * will also need to fetch more results when the user scrolls if more pages remain.
 */

@Component({
  tag: 'manifold-marketplace-grid',
  styleUrl: 'manifold-marketplace-grid.css',
  shadow: true,
})
export class ManifoldMarketplaceGrid {
  @Element() el: HTMLElement;
  @Prop() featured?: string[] = [];
  @Prop() freeProducts?: string[] = [];
  @Prop() hideCategories?: boolean = false;
  @Prop() hideSearch?: boolean = false;
  @Prop() hideTemplates?: boolean = false;
  @Prop() preserveEvent: boolean = false;
  @Prop() productLinkFormat?: string;
  @Prop() products: string[] = [];
  @Prop() services: ProductEdge[] = [];
  @Prop() skeleton?: boolean = false;
  @Prop() templateLinkFormat?: string;
  @State() filter: string | null;
  @State() activeCategory?: string;
  @State() scrollToCategory: string | null;
  @State() search: string = '';

  componentDidLoad() {
    this.activeCategory = this.categories[0]; // eslint-disable-line prefer-destructuring

    if (this.el.shadowRoot) {
      const container = this.el.shadowRoot.querySelector('.service-grid');
      if (container) {
        observeRect(container, this.handleScroll).observe();
      }
    }
  }

  componentDidUpdate() {
    if (this.scrollToCategory) {
      if (this.el.shadowRoot) {
        const heading = this.el.shadowRoot.querySelector(`#category-${this.scrollToCategory}`);
        if (heading) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      this.scrollToCategory = null;
    }
  }

  get categories(): string[] {
    if (this.hideCategories) {
      return [];
    }
    const categoryList: string[] = [];

    // Iterate through services, only add unique categories
    this.filteredServices.forEach(({ node }) => {
      node.categories.forEach(({ label }) => {
        if (!categoryList.includes(label)) {
          categoryList.push(label);
        }
      });
    });

    // Skip template-only categories if hiding custom
    if (!this.hideTemplates) {
      serviceTemplates.forEach(({ category }) => {
        if (!categoryList.includes(category)) {
          categoryList.push(category);
        }
      });
    }

    // Return sorted alphabetically
    return [...categoryList].sort((a, b) => a.localeCompare(b));
  }

  get filteredServices(): ProductEdge[] {
    if (this.skeleton) {
      return this.services;
    }

    const services = this.products.length
      ? this.products.reduce<ProductEdge[]>((all, p) => {
          const service = this.services.find(s => s.node.label === p);
          return service ? all.concat(service) : all;
        }, [])
      : this.services;

    // Handle search
    if (this.filter && this.filter.length) {
      return filteredServices(this.filter, services);
    }

    return services;
  }

  get showCategories(): boolean {
    // Hide categories if searching
    if (this.filter) {
      return false;
    }
    // Else, hide categories if hide-categories is specified
    return !this.hideCategories;
  }

  private categoryClick = (category: string, e: Event) => {
    this.scrollToCategory = category;
    this.filter = '';
    e.preventDefault();
  };

  private categorizedServices(category: string): ProductEdge[] {
    return categories(this.filteredServices)[category] || [];
  }

  private handleSearch = (el?: HTMLElement) => {
    if (!el) {
      return;
    }
    el.addEventListener('search', (e: Event) => {
      const val = (e.srcElement as HTMLInputElement).value;
      if (!val) {
        this.filter = '';
      }
    });
  };

  private handleScroll = ({ bottom }: ClientRect): void => {
    if (!this.el.shadowRoot) {
      return;
    }

    let currentCategory = this.categories[0]; // save last category name
    let nextY = -Infinity; // save upcoming scroll position

    let i = 0;
    const sections = this.el.shadowRoot.querySelectorAll('.category-heading'); // grab all section headings

    // if we’ve scrolled to the bottom, highlight the last section
    if (bottom <= window.innerHeight) {
      this.activeCategory = this.categories[this.categories.length - 1];
      return;
    }

    // loop through every section, and find the first section where its top >= -1 (it’s visible)
    // we use 1 because of subpixel rounding errors; at 0 the next section doesn’t highlight properly
    while (nextY < 1) {
      // if we’ve reached the end, grab last category and break
      if (i + 1 >= sections.length) {
        currentCategory = this.categories[this.categories.length - 1];
        break;
      }

      currentCategory = this.categories[i]; // get current section name
      if (sections[i + 1]) {
        // get next section’s scroll position to see if it’s in the viewport (>= 1)
        nextY = Math.floor(sections[i + 1].getBoundingClientRect().top); // round
      }

      i += 1; // continue
    }

    // Update active category
    this.activeCategory = currentCategory;
  };

  private updateFilter = (e: KeyboardEvent): void => {
    if (e.srcElement) {
      this.filter = (e.srcElement as HTMLInputElement).value;
    }
  };

  private renderServiceCard = (product: ProductEdge) => {
    const productNode: Product & {
      freePlans?: PlanConnection;
    } = product.node;

    return (
      <manifold-product-card-view
        description={productNode.tagline}
        isFeatured={this.featured && this.featured.includes(productNode.label)}
        isFree={Array.isArray(this.freeProducts) && this.freeProducts.includes(productNode.label)}
        logo={productNode.logoUrl}
        name={productNode.displayName}
        preserveEvent={this.preserveEvent}
        productId={productNode.id}
        productLabel={productNode.label}
        productLinkFormat={this.productLinkFormat}
        skeleton={this.skeleton}
      />
    );
  };

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    return (
      <div class="wrapper" data-categorized={this.showCategories}>
        {!this.hideSearch && (
          <input
            class="search"
            type="search"
            autocapitalize="off"
            placeholder="Search for a service or category"
            value={this.filter || ''}
            onKeyUp={this.updateFilter}
            ref={this.handleSearch}
          />
        )}
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
            <slot name="sidebar" />
          </div>
        </aside>
        <div class="service-grid" data-categorized={this.showCategories}>
          {this.showCategories
            ? this.categories.map(category => [
                <h1 id={`category-${category}`} class="category-heading">
                  <manifold-icon icon={categoryIcon[category]} />
                  {formatCategoryLabel(category)}
                </h1>,
                this.categorizedServices(category).map(service => this.renderServiceCard(service)),
                !this.hideTemplates && (
                  <manifold-template-card
                    category={category}
                    preserveEvent={this.preserveEvent}
                    templateLinkFormat={this.templateLinkFormat}
                  />
                ),
              ])
            : this.filteredServices.map(service => this.renderServiceCard(service))}
          {this.filteredServices.length === 0 && <manifold-toast>No services found</manifold-toast>}
        </div>
      </div>
    );
  }
}
