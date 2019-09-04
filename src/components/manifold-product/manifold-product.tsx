import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Product } from '../../types/graphql';
import Tunnel from '../../data/connection';
import logger from '../../utils/logger';
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
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
  @State() product?: Product;
  @Watch('productLabel') productChange(newLabel: string) {
    this.fetchProduct(newLabel);
  }

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

Tunnel.injectProps(ManifoldProduct, ['graphqlFetch']);
