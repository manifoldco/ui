import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections, Env } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections[Env.Prod];
  /** _(optional)_ Link format structure, with `:product` placeholder */
  @Prop() linkFormat?: string;
  /** _(optional)_ Comma-separated list of featured products (labels) */
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
        linkFormat={this.linkFormat}
        featured={this.featured}
      >
        <manifold-service-grid slot="marketplace-content" />
      </manifold-services-tunnel>
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection']);
