import { h, Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface EventDetail {
  productId?: string;
  productLabel?: string;
  productName?: string;
}

@Component({ tag: 'manifold-service-card' })
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  @Prop() skeleton?: boolean = false;
  @Prop() productId?: string;
  @Prop() productLabel?: string;
  @Prop() productName?: string;
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
    if (!this.productLinkFormat || !this.product) {
      return '';
    }
    return this.productLinkFormat.replace(/:product/gi, this.product.body.label);
  }

  async fetchProduct(productLabel?: string, productId?: string) {
    if (!this.restFetch) {
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
      this.product = undefined;
      const productResp = await this.restFetch<Catalog.ExpandedProduct>({
        service: 'catalog',
        endpoint: `/products/${productId}`,
      });

      if (productResp instanceof Error) {
        console.error(productResp);
        return;
      }

      this.product = productResp;

      await this.fetchIsFree();
    } else if (productLabel) {
      const productResp = await this.restFetch<Catalog.ExpandedProduct[]>({
        service: 'catalog',
        endpoint: `/products/?label=${productLabel}`,
      });

      if (productResp instanceof Error) {
        console.error(productResp);
        return;
      }

      if (productResp.length) {
        // eslint-disable-next-line prefer-destructuring
        this.product = productResp[0];

        await this.fetchIsFree();
      }
    }

    this.loading = false;
  }

  async fetchIsFree() {
    if (!this.restFetch || !this.product) {
      return;
    }

    const response = await this.restFetch<Catalog.ExpandedPlan[]>({
      service: 'catalog',
      endpoint: `/plans/?product_id=${this.product.id}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    if (Array.isArray(response) && response.find(plan => plan.body.free === true)) {
      this.isFree = true;
    }
  }

  onClick = (e: Event): void => {
    if (!this.productLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        productId: this.product ? this.product.id : this.productId,
        productLabel: this.product ? this.product.body.label : this.productLabel,
        productName: this.product ? this.product.body.name : this.productName,
      };
      this.marketplaceClick.emit(detail);
    }
  };

  @logger()
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
        <manifold-service-card-view
          description={this.product.body.tagline}
          isFeatured={this.isFeatured}
          isFree={this.isFree}
          label={this.product.body.label}
          logo={this.product.body.logo_url}
          name={this.product.body.name}
          productId={this.product.id}
        >
          <manifold-forward-ref slot="cta">
            <slot name="cta" />
          </manifold-forward-ref>
        </manifold-service-card-view>
      </a>
    ) : (
      // ☠
      <manifold-service-card-view
        loading={true}
        name="Awesome product"
        description="Awesome product description"
      />
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['restFetch']);
