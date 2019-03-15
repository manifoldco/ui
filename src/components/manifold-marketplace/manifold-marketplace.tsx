import { Component, Prop, State } from '@stencil/core';
import { Service } from 'types/Service';

const productionProductsUrl = 'https://api.catalog.manifold.co/v1/products/';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() productsUrl?: string;
  @State() services: Service[];

  componentWillLoad() {
    return fetch(this.productsUrl || productionProductsUrl)
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  render() {
    return (
      <service-grid
        services={this.services}
        featured={this.featured}
        service-link={this.serviceLink}
      />
    );
  }
}
