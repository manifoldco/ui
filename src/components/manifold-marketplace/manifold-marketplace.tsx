import { h, Component, Prop, State, Element } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** Comma-separated list of hidden products (labels) */
  @Prop() excludes?: string;
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
  @State() parsedExcludes: string[] = [];
  @State() parsedFeatured: string[] = [];
  @State() parsedProducts: string[] = [];
  @State() services: Catalog.Product[] = [];

  componentWillLoad() {
    this.parseProps();
    this.fetchProducts();
  }

  fetchProducts = async () => {
    if (!this.connection) {
      return;
    }
    const response = await fetch(`${this.connection.catalog}/products`, withAuth(this.authToken));
    const products: Catalog.ExpandedProduct[] = await response.json();
    // Alphabetize once, then don’t worry about it
    this.services = [...products].sort((a, b) => a.body.name.localeCompare(b.body.name));
  };

  private parse(list: string): string[] {
    return list.split(',').map(item => item.trim());
  }

  private parseProps() {
    if (typeof this.featured === 'string') this.parsedFeatured = this.parse(this.featured);
    if (typeof this.excludes === 'string') this.parsedExcludes = this.parse(this.excludes);
    if (typeof this.products === 'string') this.parsedProducts = this.parse(this.products);
  }

  render() {
    return (
      <manifold-marketplace-grid
        excludes={this.parsedExcludes}
        featured={this.parsedFeatured}
        hideCategories={this.hideCategories}
        hideSearch={this.hideSearch}
        hideTemplates={this.hideTemplates}
        preserveEvent={this.preserveEvent}
        productLinkFormat={this.productLinkFormat}
        products={this.parsedProducts}
        services={this.services}
        templateLinkFormat={this.templateLinkFormat}
      />
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection', 'authToken']);
