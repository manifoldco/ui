import { Component, Prop, State } from '@stencil/core';
import { Service } from 'types/Service';
import { Collection } from 'types/Collection';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() url: string = 'https://api.catalog.manifold.co/v1/';
  @Prop() collections: Collection[] = [];
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
