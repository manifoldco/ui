import { h, Component, Prop, State, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Product } from '../../types/graphql';
import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';

const query = gql`
  query PRODUCT($productLabel: String!) {
    product(label: $productLabel) {
      documentationUrl
      supportEmail
      displayName
      label
      logoUrl
      categories {
        label
      }
      termsUrl
      valueProps {
        header
        body
      }
      tagline
      screenshots {
        url
        order
      }
      provider {
        displayName
      }
    }
  }
`;

@Component({ tag: 'manifold-product' })
export class ManifoldProduct {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
  @State() product?: Product;
  @Event({ eventName: 'manifold-product-load' }) loaded: EventEmitter<Product | undefined | null>;

  @Watch('productLabel') productChange(newLabel: string) {
    this.fetchProduct(newLabel);
  }

  @loadMark()
  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.graphqlFetch) {
      return;
    }

    const variables = { productLabel };
    const { data } = await this.graphqlFetch({ query, variables });

    this.product = (data && data.product) || undefined;
    this.loaded.emit(data && data.product);
  };

  @logger()
  render() {
    return (
      <manifold-product-page product={this.product}>
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-product-page>
    );
  }
}
