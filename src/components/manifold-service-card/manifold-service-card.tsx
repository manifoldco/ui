import { Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

interface EventDetail {
  productId?: string;
  productLabel?: string;
}

@Component({
  tag: 'manifold-service-card',
  styleUrl: 'manifold-service-card.css',
  shadow: true,
})
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  @Prop() name?: string;
  @Prop() connection: Connection = connections.prod;
  @Prop() description?: string;
  @Prop() isFeatured?: boolean;
  @Prop() label?: string;
  @Prop() linkFormat?: string;
  @Prop() logo?: string;
  @Prop() preserveEvent: boolean = false;
  @Prop() productId?: string;
  @Prop() skeleton: boolean = false;
  @State() isFree: boolean = false;
  @Event({ eventName: 'manifold-marketplace-click', bubbles: true }) marketplaceClick: EventEmitter;
  @Watch('productId')
  watchHandler(newProductId: string) {
    this.fetchIsFree(newProductId);
  }

  componentWillLoad() {
    this.fetchIsFree();
  }

  get href() {
    if (!this.linkFormat || !this.label) return '';
    return this.linkFormat.replace(/:product/gi, this.label);
  }

  fetchIsFree(productId = this.productId) {
    if (typeof productId !== 'string') return;

    fetch(`${this.connection.catalog}/plans/?product_id=${this.productId}`, withAuth())
      .then(response => response.json())
      .then((data: Catalog.ExpandedPlan[]) => {
        if (data.find(plan => plan.body.free === true)) {
          this.isFree = true;
        }
      });
  }

  onClick = (e: Event): void => {
    if (!this.linkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        productId: this.productId,
        productLabel: this.label,
      };
      this.marketplaceClick.emit(detail);
    }
  };

  render() {
    return !this.skeleton ? (
      <a
        class="wrapper"
        role="button"
        itemscope
        itemtype="https://schema.org/Product"
        itemprop="url"
        href={this.href}
        onClick={this.onClick}
      >
        <div class="logo">
          <manifold-lazy-image src={this.logo} alt={this.name} itemprop="image" />
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
    ) : (
      // ☠
      <div class="wrapper">
        <div class="logo">
          <manifold-skeleton-img />
        </div>
        <h3 class="name">
          <manifold-skeleton-text>{this.name}</manifold-skeleton-text>
        </h3>
        <div class="info">
          <p class="description">
            <manifold-skeleton-text>{this.description}</manifold-skeleton-text>
          </p>
        </div>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['connection']);
