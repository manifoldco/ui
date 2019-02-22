import { Component, Prop, State } from '@stencil/core';
import { Service } from 'types/Service';

@Component({ tag: 'manifold-marketplace' })
export class ManifoldMarketplace {
  @Prop() serviceLink?: string;
  @Prop() theme?: 'light' | 'dark';
  @State() services: Service[];

  componentWillLoad() {
    return fetch('https://api.catalog.manifold.co/v1/products/')
      .then(response => response.json())
      .then(data => {
        this.services = data;
      });
  }

  private getThemeColor() {
    if (this.theme === 'dark') {
      return {
        '--background-color': 'var(--c-black)',
        '--text-color': 'var(--c-white)',
      };
    }
    return {
      '--background-color': 'var(--c-white)',
      '--text-color': 'var(--c-black)',
    };
  }

  render() {
    return (
      <service-grid
        services={this.services}
        service-link={this.serviceLink}
        theme-color={this.getThemeColor()}
        show-category-menu={true}
      />
    );
  }
}
