import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Link format structure, with `:product` placeholder */
  @Prop() hideCustom?: boolean = false;
  /** Hide custom cards? */
  @Prop() linkFormat?: string;
  /** Comma-separated list of featured products (labels) */
  @Prop() featured?: string;
  @State() services: Catalog.Product[] = [];

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/products`, withAuth())
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  render() {
    return (
      <manifold-services-tunnel
        services={this.services}
        featured={this.featured}
        hideCustom={this.hideCustom}
        linkFormat={this.linkFormat}
      >
        <manifold-service-grid slot="marketplace-content" />
      </manifold-services-tunnel>
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection']);
