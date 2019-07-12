import { h, Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

interface EventDetail {
  productId?: string;
  productLabel?: string;
}

@Component({ tag: 'manifold-service-card' })
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
    if (!skeleton && this.productId) {
      this.fetchIsFree(this.productId);
    }
  }
  @Watch('productId') productChange(newProductId: string) {
    if (!this.skeleton) {
      this.fetchIsFree(newProductId);
    }
  }

  get href() {
    if (!this.productLinkFormat || !this.label) {
      return '';
    }
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
        role="button"
        itemscope
        itemtype="https://schema.org/Product"
        itemprop="url"
        href={this.href}
        onClick={this.onClick}
        style={{ textDecoration: 'none' }}
      >
        <manifold-service-view
          name={this.name}
          description={this.description}
          isFeatured={this.isFeatured}
          label={this.label}
          logo={this.logo}
          productId={this.productId}
          isFree={this.isFree}
        />
      </a>
    ) : (
      // ☠
      <manifold-service-view
        loading={true}
        name={this.name}
        description={this.description}
      />
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['connection', 'authToken']);
