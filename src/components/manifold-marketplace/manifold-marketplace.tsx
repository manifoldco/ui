import { Component, Prop, State } from '@stencil/core';
import { Service } from 'types/Service';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Prop() serviceLink?: string;
  @State() services: Service[];

  componentWillLoad() {
    return fetch('https://api.catalog.manifold.co/v1/products/')
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  render() {
    return <service-grid services={this.services} service-link={this.serviceLink} />;
  }
}
