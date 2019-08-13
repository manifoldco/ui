import { h, Component, Element, State, Prop, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-service-card' })
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) product?: Catalog.Product;
  @Prop() productId?: string;
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() free: boolean = false;

  @Watch('product') productChange(newProduct: Catalog.Product) {
    if (newProduct) {
      this.fetchIsFree(); // if product has changed, re-fetch free
    }
  }

  @Watch('isFree') isFreeChange(newFree: boolean) {
    this.free = newFree;
  }

  @Watch('productId') productIdChange(newProductId: string) {
    if (!this.product || (this.product && this.product.id !== newProductId)) {
      this.fetchProduct({ id: newProductId });
    }
  }

  @Watch('productLabel') productLabelChange(newProductLabel: string) {
    if (!this.product || (this.product && this.product.body.label !== newProductLabel)) {
      this.fetchProduct({ label: newProductLabel });
    }
  }

  componentWillLoad() {
    this.fetchProduct({ id: this.productId, label: this.productLabel });
  }

  get href() {
    if (this.productLinkFormat && this.product) {
      return this.productLinkFormat.replace(/:product/gi, this.product.body.label);
    }
    return ''; // if no format, or product is loading, don’t calculate href
  }

  async fetchProduct({ id, label }: { id?: string; label?: string }) {
    if (!this.restFetch) {
      return;
    }

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
      this.free = true;
    } else {
      this.free = false;
    }
  }

  @logger()
  render() {
    return this.product && typeof this.free === 'boolean' ? (
      <manifold-service-card-view
        description={this.product.body.tagline}
        isFeatured={this.isFeatured}
        isFree={this.free}
        logo={this.product.body.logo_url}
        name={this.product.body.name}
        preserveEvent={this.preserveEvent}
        productId={this.product.id}
        productLabel={this.product.body.label}
        productLinkFormat={this.productLinkFormat}
      >
        <manifold-forward-ref slot="cta">
          <slot name="cta" />
        </manifold-forward-ref>
      </manifold-service-card-view>
    ) : (
      // ☠
      <manifold-service-card-view
        skeleton={true}
        description="Awesome product description"
        logo="product.jpg"
        name="Awesome product"
      />
    );
  }
}

Tunnel.injectProps(ManifoldServiceCard, ['restFetch']);
