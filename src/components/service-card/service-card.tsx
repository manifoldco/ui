import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'service-card',
  styleUrl: 'service-card.css',
  shadow: true,
})
export class ServiceCard {
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() logo?: string;
  @Prop() tags?: string;

  private listTags(): string[] {
    return this.tags ? this.tags.split(',').map(tag => tag.trim()) : [];
  }

  render() {
    return (
      <div class="wrapper" itemScope itemType="https://schema.org/Product">
        <div class="logo">
          <img src={this.logo} alt={this.name} itemProp="image" />
        </div>
        <h3 class="name" itemProp="name">
          {this.name}
        </h3>
        <div class="tags">
          {this.listTags().map(tag => (
            <div class="tag">{tag}</div>
          ))}
        </div>
        <div class="info">
          <p class="description" itemProp="description">
            {this.description}
          </p>
        </div>
      </div>
    );
  }
}
