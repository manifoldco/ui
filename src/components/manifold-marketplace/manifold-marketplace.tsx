import { Component, Prop, State, Element } from '@stencil/core';
import { Collection } from 'types/Collection';

import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() connection: Connection;
  @Prop() collections: Collection[] = [];
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
      <mani-tunnel
        services={this.services}
        serviceLink={this.serviceLink}
        featured={this.featured}
        collections={this.collections}
      >
        <service-grid slot="marketplace-content" />
      </mani-tunnel>
    );
  }
}

Tunnel.injectProps(ManifoldMarketplace, ['connection']);
