import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'manifold-service-card',
  styleUrl: 'service-card.css',
  shadow: true,
})
export class ManifoldServiceCard {
  @Event({ eventName: 'manifold-serviceCard-click' }) cardClicked: EventEmitter;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() label?: string;
  @Prop() logo?: string;
  @Prop() isFeatured?: boolean;
  @Prop() serviceLink?: string;
  @Prop() isCustom?: boolean;

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
        class={`wrapper ${this.isCustom ? 'is-custom' : ''}`}
        role="button"
        itemscope
        itemtype="https://schema.org/Product"
        itemprop="url"
        href={this.serviceLink}
        onClick={this.onClick}
      >
        {this.isCustom && <manifold-icon class="gear" icon="settings" />}
        <div class="logo">
          {this.isCustom ? (
            <div class="icon-border">
              <manifold-icon class="icon" icon={this.logo} />
            </div>
          ) : (
            <img src={this.logo} alt={this.name} itemprop="image" />
          )}
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
