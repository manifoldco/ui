import { Component, Prop, State, Element } from '@stencil/core';
import { Service } from 'types/Service';
import { Collection } from 'types/Collection';

import Tunnel from '../../data/connection';
import { Env, Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Element() el: HTMLElement;
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() connection: Connection = connections[Env.Prod];
  @Prop() collections: Collection[] = [];
  @State() services: Service[] = [];

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
