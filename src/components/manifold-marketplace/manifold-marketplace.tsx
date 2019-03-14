import { Component, Prop, State } from '@stencil/core';
import { Service } from 'types/Service';

import Tunnel from '../../data/marketplace';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() url: string = 'https://api.catalog.manifold.co/v1/';
  @State() services: Service[];

  componentWillLoad() {
    return fetch(`${this.url.replace(/\/$/, '')}/products`)
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  render() {
    return (
      <Tunnel.Provider state={{ services: this.services }}>
        <service-grid
          services={this.services}
          featured={this.featured}
          service-link={this.serviceLink}
        />
      </Tunnel.Provider>
    );
  }
}
