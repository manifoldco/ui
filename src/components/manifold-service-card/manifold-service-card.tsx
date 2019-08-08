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
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) isFree: boolean = false;
  @Prop({ mutable: true }) product?: Catalog.Product;
  @Prop() productId?: string;
  @Prop() productLabel?: string;
  @Prop() productName?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() skeleton?: boolean = false;
  @State() loading: boolean = false;
  @Event({ eventName: 'manifold-marketplace-click', bubbles: true }) marketplaceClick: EventEmitter;

  @Watch('product') productChange(newProduct: Catalog.Product) {
    if (newProduct) {
      this.fetchIsFree(); // if product has changed, re-fetch free
    }
  }

  @Watch('skeleton') skeletonChange(newSkeleton: boolean) {
    if (!newSkeleton && !this.product) {
      this.fetchProduct({ id: this.productId, label: this.productLabel });
    }
  }

  @Watch('productId') productIdChange(newProductId: string) {
    if (this.skeleton) {
      return;
    }
    // don’t re-fetch same product
    if (!this.product || (this.product && this.product.id !== newProductId)) {
      this.fetchProduct({ id: newProductId });
    }
  }

  @Watch('productLabel') productLabelChange(newProductLabel: string) {
    if (this.skeleton) {
      return;
    }

    // don’t re-fetch same product
    if (!this.product || (this.product && this.product.body.label !== newProductLabel)) {
      this.fetchProduct({ label: newProductLabel });
    }
  }

  componentWillLoad() {
    if (this.skeleton || this.product) {
      return null; // if skeleton UI or it’s passed a product, don’t fetch anything
    }

    return this.fetchProduct({ id: this.productId, label: this.productLabel });
  }

  get href() {
    // if no format, or product is loading, don’t calculate href
    if (!this.productLinkFormat || !this.product) {
      return '';
    }
    return this.productLinkFormat.replace(/:product/gi, this.product.body.label);
  }

  async fetchProduct({ id, label }: { id?: string; label?: string }) {
    if (!this.restFetch) {
      return;
    }

    this.loading = true;

    if (id) {
      this.product = undefined;
      const productResp = await this.restFetch<Catalog.ExpandedProduct>({
        service: 'catalog',
        endpoint: `/products/${id}`,
      });

      if (productResp instanceof Error) {
        console.error(productResp);
        return;
      }

      this.product = productResp;
    } else if (label) {
      this.product = undefined;
      const productResp = await this.restFetch<Catalog.ExpandedProduct[]>({
        service: 'catalog',
        endpoint: `/products/?label=${label}`,
      });

      if (productResp instanceof Error) {
        console.error(productResp);
        return;
      }

      if (productResp.length) {
        this.product = productResp[0]; // eslint-disable-line prefer-destructuring
      }
    }

    this.loading = false;
  }

  async fetchIsFree() {
    if (!this.restFetch || !this.product) {
      return;
    }

    this.loading = true;

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

    this.loading = false;
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
