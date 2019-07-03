import { h, Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
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
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  @Prop() description?: string;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop() label?: string;
  @Prop() productLinkFormat?: string;
  @Prop() logo?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() productId?: string;
  @Prop() skeleton?: boolean = false;
  @State() isFree: boolean = false;
  @Event({ eventName: 'manifold-marketplace-click', bubbles: true }) marketplaceClick: EventEmitter;
  @Watch('skeleton') skeletonChange(skeleton: boolean) {
    if (!skeleton && this.productId) this.fetchIsFree(this.productId);
  }
  @Watch('productId') productChange(newProductId: string) {
    if (this.skeleton !== true) this.fetchIsFree(newProductId);
  }

  get href() {
    if (!this.productLinkFormat || !this.label) return '';
    return this.productLinkFormat.replace(/:product/gi, this.label);
  }

  async fetchIsFree(productId: string) {
    if (!this.connection) {
      return;
    }
    const response = await fetch(
      `${this.connection.catalog}/plans/?product_id=${productId}`,
      withAuth(this.authToken)
    );
    const plans: Catalog.ExpandedPlan[] = await response.json();
    if (Array.isArray(plans) && plans.find(plan => plan.body.free === true)) {
      this.isFree = true;
    }
  }

  onClick = (e: Event): void => {
    if (!this.productLinkFormat || this.preserveEvent) {
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
          {this.isFeatured && <manifold-badge>featured</manifold-badge>}
          {this.isFree && <manifold-badge data-tag="free">Free</manifold-badge>}
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

Tunnel.injectProps(ManifoldServiceCard, ['connection', 'authToken']);
