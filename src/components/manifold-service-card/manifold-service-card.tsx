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
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  @Prop() skeleton?: boolean = false;
  @Prop() productId?: string;
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) product?: Catalog.Product;
  @State() isFree: boolean = false;
  @State() loading: boolean = false;
  @Event({ eventName: 'manifold-marketplace-click', bubbles: true }) marketplaceClick: EventEmitter;

  @Watch('skeleton') skeletonChange(newSkeleton: boolean) {
    if (!newSkeleton) {
      this.fetchProduct(this.productLabel, this.productId);
    }
  }

  @Watch('productId') productIdChange(newProductId: string) {
    if (!this.skeleton) {
      this.fetchProduct(undefined, newProductId);
    }
  }

  @Watch('productLabel') productLabelChange(newProductLabel: string) {
    if (!this.skeleton) {
      this.fetchProduct(newProductLabel);
    }
  }

  componentWillLoad() {
    if (this.skeleton) {
      return;
    }

    if (this.productId) {
      this.fetchProduct(undefined, this.productId);
    } else if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  get href() {
    if (!this.productLinkFormat || !this.productLabel) {
      return '';
    }
    return this.productLinkFormat.replace(/:product/gi, this.productLabel);
  }

  async fetchProduct(productLabel?: string, productId?: string) {
    if (!this.connection) {
      return;
    }

    this.loading = true;
    if (this.product) {
      // Only fetch is free if the product is provided
      await this.fetchIsFree();
      this.loading = false;
      return;
    }

    if (productId) {
      const response = await fetch(
        `${this.connection.catalog}/products/${productId}`,
        withAuth(this.authToken)
      );
      this.product = await response.json();

      await this.fetchIsFree();
    } else if (productLabel) {
      const response = await fetch(
        `${this.connection.catalog}/products/?label=${productLabel}`,
        withAuth(this.authToken)
      );
      const products: Catalog.Product[] = await response.json();
      if (products.length) {
        // eslint-disable-next-line prefer-destructuring
        this.product = products[0];

        await this.fetchIsFree();
      }
    }

    this.loading = false;
  }

  async fetchIsFree() {
    if (!this.connection || !this.product) {
      return;
    }

    const response = await fetch(
      `${this.connection.catalog}/plans/?product_id=${this.product.id}`,
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
        productId: this.product ? this.product.id : this.productId,
        productLabel: this.product ? this.product.body.label : this.productLabel,
      };
      this.marketplaceClick.emit(detail);
    }
  };

  render() {
    return !this.skeleton && !this.loading && this.product ? (
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
          name={this.product.body.name}
          description={this.product.body.tagline}
          isFeatured={this.isFeatured}
          label={this.productLabel}
          logo={this.product.body.logo_url}
          productId={this.productId}
          isFree={this.isFree}
        />
      </a>
    ) : (
      // ☠
      <manifold-service-view
        loading={true}
        name="Awesome product"
        description="Awesome product description"
      />
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['connection', 'authToken']);
