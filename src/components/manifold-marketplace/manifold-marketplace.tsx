import { Component, Prop, State, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection, connections, Env } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() connection: Connection = connections[Env.Prod];
  @State() services: Catalog.Product[] = [];

  componentWillLoad() {
    return fetch(`${this.connection.catalog}/products`)
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  render() {
    return (
      <manifold-services-tunnel
        services={this.services}
        serviceLink={this.serviceLink}
        featured={this.featured}
      >
        <manifold-service-grid slot="marketplace-content" />
      </manifold-services-tunnel>
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection']);
