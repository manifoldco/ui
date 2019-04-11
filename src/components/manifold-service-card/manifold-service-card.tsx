import { Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

@Component({
  tag: 'manifold-service-card',
  styleUrl: 'manifold-service-card.css',
  shadow: true,
})
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  @Event({ eventName: 'manifold-serviceCard-click' }) cardClicked: EventEmitter;
  @Prop() name?: string;
  @Prop() connection: Connection;
  @Prop() description?: string;
  @Prop() isCustom?: boolean;
  @Prop() isFeatured?: boolean;
  @Prop() label?: string;
  @Prop() logo?: string;
  @Prop() productId?: string;
  @Prop() serviceLink?: string;
  @State() isFree?: boolean = false;
  @Watch('productId') watchHandler(newProductId: string) {
    this.fetchIsFree(newProductId);
  }

  componentWillLoad() {
    this.fetchIsFree();
  }

  fetchIsFree(productId = this.productId) {
    if (typeof productId !== 'string') return;

    fetch(`${this.connection.catalog}/plans/?product_id=${this.productId}`)
      .then(response => response.json())
      .then((data: Catalog.ExpandedPlan[]) => {
        if (data.find(plan => plan.body.free === true)) {
          this.isFree = true;
        }
      });
  }

  onClick = (e: Event): void => {
    if (!this.serviceLink) {
      e.preventDefault();
      this.cardClicked.emit({ label: this.label });
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
              <manifold-lazy-image src={this.logo} alt={this.name} itemprop="image" />
            )}
        </div>
        <h3 class="name" itemprop="name">
          {this.name}
        </h3>
        <div class="info">
          <p class="description" itemprop="description">
            {this.description}
          </p>
        </div>
        <div class="tags">
          {this.isFeatured && <div class="tag">featured</div>}
          {this.isFree && (
            <div class="tag" data-tag="free">
              free
            </div>
          )}
        </div>
      </a>
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['connection']);
