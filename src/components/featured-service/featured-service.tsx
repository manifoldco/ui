import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'featured-service',
  styleUrl: 'featured-service.css',
  shadow: true,
})
export class FeaturedService {
  @Prop() name: string;
  @Prop() logo: string;
  @Prop() serviceColorId: string;

  get backgroundColor() {
    return { '--service-color': `var(${this.serviceColorId})` };
  }

  render() {
    return (
      <div class="card" style={this.backgroundColor}>
        <div class="logo-wrapper">
          <img class="logo" src={this.logo} alt={this.name} itemprop="logo" />
        </div>
        <h2 class="title" itemprop="name">
          {this.name}
        </h2>
        <p class="description">
          <slot />
        </p>
      </div>
    );
  }
}
