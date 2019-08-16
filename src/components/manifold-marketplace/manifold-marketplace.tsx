import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import skeletonProducts from '../../data/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** Comma-separated list of featured products (labels) */
  @Prop() featured?: string;
  /** Hide categories & side menu? */
  @Prop() hideCategories?: boolean = false;
  /** Hide search? */
  @Prop() hideSearch?: boolean = false;
  /** Hide template cards? */
  @Prop() hideTemplates?: boolean = false;
  /** Should the JS event still fire, even if product-link-format is passed?  */
  @Prop() preserveEvent?: boolean = false;
  /** Product link structure, with `:product` placeholder */
  @Prop() productLinkFormat?: string;
  /** Comma-separated list of shown products (labels) */
  @Prop() products?: string;
  /** Template format structure, with `:product` placeholder */
  @Prop() templateLinkFormat?: string;
  @State() freeProducts?: string[];
  @State() parsedFeatured: string[] = [];
  @State() parsedProducts: string[] = [];
  @State() services: Catalog.Product[] = [];

  @Watch('services') servicesUpdated() {
    this.fetchFreeProducts();
  }

  componentWillLoad() {
    this.parseProps();
    this.fetchProducts(); // don’t wait on product fetch
  }

  fetchProducts = async () => {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Catalog.ExpandedProduct[]>({
      service: 'catalog',
      endpoint: `/products`,
    });

    if (response) {
      // Alphabetize once, then don’t worry about it
      this.services = [...response].sort((a, b) => a.body.name.localeCompare(b.body.name));
    }
  };

  // fetch free products once, then save
  fetchFreeProducts = async () => {
    const freeProducts: string[] = [];

    // Fetch all plans in parallel
    await Promise.all(
      this.services.map(
        ({ id }) =>
          // eslint-disable-next-line no-async-promise-executor
          new Promise(async resolve => {
            if (!this.restFetch) {
              resolve();
              return;
            }

            const plansResp = await this.restFetch<Catalog.ExpandedPlan[]>({
              service: 'catalog',
              endpoint: `/plans/?product_id=${id}`,
            });

            if (plansResp instanceof Error) {
              console.error(plansResp);
              return;
            }

            if (Array.isArray(plansResp) && plansResp.find(plan => plan.body.free === true)) {
              freeProducts.push(id);
            }
            resolve();
          })
      )
    );

    this.freeProducts = freeProducts; // don’t update state until all requests finish
  };

  private parse(list: string): string[] {
    return list.split(',').map(item => item.trim());
  }

  private parseProps() {
    if (typeof this.featured === 'string') {
      this.parsedFeatured = this.parse(this.featured);
    }
    if (typeof this.products === 'string') {
      this.parsedProducts = this.parse(this.products);
    }
  }

  @logger()
  render() {
    const isLoading = !this.services.length || !this.freeProducts; // wait for free calls to finish

    return (
      <manifold-marketplace-grid
        featured={this.parsedFeatured}
        freeProducts={this.freeProducts}
        hideCategories={this.hideCategories}
        hideSearch={this.hideSearch}
        hideTemplates={this.hideTemplates}
        preserveEvent={this.preserveEvent}
        productLinkFormat={this.productLinkFormat}
        products={this.parsedProducts}
        skeleton={isLoading}
        services={isLoading ? skeletonProducts : this.services}
        templateLinkFormat={this.templateLinkFormat}
      />
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['restFetch']);
