import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import { Product, Provider } from '../../types/graphql';
import Tunnel from '../../data/connection';
import graphqlFetch from '../../utils/graphqlFetch';
import { Connection, connections } from '../../utils/connections';

const query = gql`
  query PRODUCT_PAGE($productLabel: String!) {
    product(label: $productLabel) {
      screenshots {
        url
        order
      }
      tagline
      valueProps {
        body
        header
      }
      displayName
      documentationUrl
      supportEmail
      label
      logoUrl
      categories {
        label
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
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** _(optional)_ Hide the CTA on the left? */
  @Prop() productLabel?: string;
  @State() product?: Product;
  @State() provider?: Provider;
  @Watch('productLabel') productChange(newLabel: string) {
    this.fetchProduct(newLabel);
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.connection) {
      return;
    }

    this.product = undefined;
    this.provider = undefined;
    const variables = { productLabel };
    const { data, error } = await graphqlFetch({ query, variables });
    if (error) {
      console.error(error);
    }
    this.product = data.product;
    this.provider = data.product.provider;
  };

  render() {
    return (
      <manifold-product-page product={this.product} provider={this.provider}>
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-product-page>
    );
  }
}

Tunnel.injectProps(ManifoldProduct, ['connection', 'authToken']);
