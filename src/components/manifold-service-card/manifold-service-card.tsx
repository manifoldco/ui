import { h, Component, Element, State, Prop, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { Product } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

const query = gql`
  query PRODUCT_CARD($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      tagline
      label
      logoUrl
      # must get all plans until 'free' filter works
      plans(first: 500, orderBy: { field: COST, direction: ASC }) {
        edges {
          node {
            free
          }
        }
      }
    }
  }
`;

@Component({ tag: 'manifold-service-card' })
export class ManifoldServiceCard {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  @Prop({ reflect: true }) isFeatured?: boolean;
  @Prop({ mutable: true }) product?: Product;
  @Prop() productLabel?: string;
  @Prop() productLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @State() free: boolean = false;

  @Watch('productLabel') productLabelChange(newProductLabel: string) {
    if (!this.product || (this.product && this.product.label !== newProductLabel)) {
      this.fetchProduct(newProductLabel);
    }
  }

  @loadMark()
  componentWillLoad() {
    this.fetchProduct(this.productLabel);
  }

  get href() {
    if (this.productLinkFormat && this.product) {
      return this.productLinkFormat.replace(/:product/gi, this.product.label);
    }
    return ''; // if no format, or product is loading, don’t calculate href
  }

  async fetchProduct(productLabel?: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({ query, variables: { productLabel } });
    if (data && data.product && data.product.plans) {
      this.product = data.product;
      // Product has at least one free plan.
      this.free = !!data.product.plans.edges.find(({ node }) => node.free);
    }
  }

  @logger()
  render() {
    if (this.product) {
      return (
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
        </manifold-service-card-view>
      );
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
