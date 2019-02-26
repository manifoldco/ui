import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'service-card',
  styleUrl: 'service-card.css',
  shadow: true,
})
export class ServiceCard {
  @Event({ eventName: 'serviceCardClicked' }) cardClicked: EventEmitter;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() label?: string;
  @Prop() logo?: string;
  @Prop() isFeatured?: boolean;
  @Prop() serviceLink?: string;

  onClick = (e: Event): void => {
    if (!this.serviceLink) {
      e.preventDefault();
      this.cardClicked.emit({
        label: this.label,
      });
    }
  };

  render() {
    return (
      <a
        class="wrapper"
        role="button"
        itemscope
        itemtype="https://schema.org/Product"
        itemprop="url"
        href={this.serviceLink}
        onClick={this.onClick}
      >
        <div class="logo">
          <img src={this.logo} alt={this.name} itemprop="image" />
        </div>
        <h3 class="name" itemprop="name">
          {this.name}
        </h3>
        <div class="tags">{this.isFeatured && <div class="tag">featured</div>}</div>
        <div class="info">
          <p class="description" itemprop="description">
            {this.description}
          </p>
        </div>
      </a>
    );
  }
}
