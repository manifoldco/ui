import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** Comma-separated list of hidden products (labels) */
  @Prop() blacklist?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Comma-separated list of featured products (labels) */
  @Prop() featured?: string;
  /** Hide template cards? */
  @Prop() hideTemplates?: boolean = false;
  /** Hide categories & side menu? */
  @Prop() hideCategories?: boolean = false;
  /** Link format structure, with `:product` placeholder */
  @Prop() linkFormat?: string;
  /** Comma-separated list of allowed products (labels) */
  @Prop() whitelist?: string;
  @State() parsedBlacklist: string[] = [];
  @State() parsedFeatured: string[] = [];
  @State() parsedWhitelist: string[] = [];
  @State() services: Catalog.Product[] = [];

  componentWillLoad() {
    this.parseProps();

    return fetch(`${this.connection.catalog}/products`, withAuth())
      .then(response => response.json())
      .then((products: Catalog.Product[]) => {
        // Alphabetize once, then don’t worry about it
        this.services = [...products].sort((a, b) => a.body.name.localeCompare(b.body.name));
      });
  }

  private parse(list: string): string[] {
    return list.split(',').map(item => item.trim());
  }

  private parseProps() {
    if (typeof this.featured === 'string') this.parsedFeatured = this.parse(this.featured);
    if (typeof this.blacklist === 'string') this.parsedBlacklist = this.parse(this.blacklist);
    if (typeof this.whitelist === 'string') this.parsedWhitelist = this.parse(this.whitelist);
  }

  render() {
    return (
      <manifold-marketplace-grid
        blacklist={this.parsedBlacklist}
        featured={this.parsedFeatured}
        hideCategories={this.hideCategories}
        hideTemplates={this.hideTemplates}
        linkFormat={this.linkFormat}
        services={this.services}
        whitelist={this.parsedWhitelist}
      />
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection']);
