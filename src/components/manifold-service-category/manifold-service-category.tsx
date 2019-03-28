import { Component, Prop } from '@stencil/core';

@Component({ tag: 'manifold-service-category', styleUrl: 'service-category.css' })
export class ManifoldServiceCategory {
  @Prop() categoryLoaded?: (el?: HTMLElement) => void;
  @Prop() icon?: string;
  @Prop() name: string;
  @Prop() label: string;
  @Prop() tagline?: string;

  render() {
    return (
      <div class="category-container">
        <h3 class="category" id={`category-${this.name}`} ref={this.categoryLoaded}>
          {this.icon && <manifold-icon icon={this.icon} marginRight />}
          {this.label}
          {this.tagline && <p class="tagline">{this.tagline}</p>}
        </h3>
        <slot />
      </div>
    );
  }
}
