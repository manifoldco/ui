import { h, Component, Element, State, Prop, Watch } from '@stencil/core';

import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import { ProductCardQuery } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

import productCardQuery from './product-card.graphql';

type PartialProduct = Omit<ProductCardQuery, 'product'>;

// Product has at least one free plan.
const isFree = (product: PartialProduct) =>
  !!(product.plans && product.plans.edges.find(({ node }) => node.free));

@Component({ tag: 'manifold-service-card' })
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop() hideUntilReady?: boolean = false;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) product?: PartialProduct;
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() free: boolean = false;
  @State() errors?: GraphqlError[];

  @Watch('product') productChange(newProduct: PartialProduct) {
    if (newProduct) {
      this.free = isFree(newProduct);
    }
  }

  @Watch('productLabel') productLabelChange(newProductLabel: string) {
    if (!this.product || (this.product && this.product.label !== newProductLabel)) {
      this.fetchProduct(newProductLabel);
    }
  }

  @loadMark()
  componentWillLoad() {
    let call;

    if (this.productLabel) {
      call = this.fetchProduct(this.productLabel);
    }

    if (this.hideUntilReady) {
      return call;
    }
    return undefined;
  }

  get href() {
    if (this.productLinkFormat && this.product) {
      return this.productLinkFormat.replace(/:product/gi, this.product.label);
    }
    return ''; // if no format, or product is loading, don’t calculate href
  }

  async fetchProduct(productLabel: string) {
    if (!this.graphqlFetch || !productLabel) {
      return;
    }

    const { data, errors } = await this.graphqlFetch<ProductCardQuery>({
      query: productCardQuery,
      variables: { productLabel },
      element: this.el,
    });
    if (data && data.product) {
      this.product = data.product;
    }

    if (errors) {
      this.errors = errors;
    }
  }

  @logger()
  render() {
    if (this.product) {
      return [
        <manifold-service-card-view
          description={this.product.tagline}
          isFeatured={this.isFeatured}
          isFree={this.free}
          logo={this.product.logoUrl}
          name={this.product.displayName}
          preserveEvent={this.preserveEvent}
          productId={this.product.id}
          productLabel={this.product.label}
          productLinkFormat={this.productLinkFormat}
        >
          <manifold-forward-slot slot="cta">
            <slot name="cta" />
          </manifold-forward-slot>
        </manifold-service-card-view>,
        this.errors &&
          this.errors.map(({ message }) => (
            <manifold-toast alertType="error">{message}</manifold-toast>
          )),
      ];
    }
    // ☠
    return (
      <manifold-service-card-view
        skeleton={true}
        description="Awesome product description"
        logo="product.jpg"
        name="Awesome product"
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-service-card-view>
    );
  }
}
