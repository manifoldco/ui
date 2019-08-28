import { Component, Prop, State, Element, Watch } from '@stencil/core';
import gql from '@manifoldco/gql-zero';

import { Product, Resource } from '../../types/graphql';
import Tunnel from '../../data/connection';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceLabel?: string;
  @State() productName?: string;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProduct(this.productLabel);
    }
    if (this.resourceLabel) {
      this.fetchResource(this.resourceLabel);
    }
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.graphqlFetch) {
      return;
    }

    this.productName = undefined;

    const product = await this.graphqlFetch<Product>({
      query: gql`
        query PRODUCT_NAME {
          product(label: "$productLabel") {
            displayName
          }
        }
      `,
      variables: { productLabel },
    });

    if (product.data) {
      this.productName = product.data.displayName;
    }
  };

  fetchResource = async (resourceName: string) => {
    if (!this.graphqlFetch) {
      return;
    }

    this.productName = undefined;

    const resource = await this.graphqlFetch<Resource>({
      query: gql`
        query RESOURCE {
          resource(label: "$resourceName") {
            plan {
              product {
                displayName
              }
            }
          }
        }
      `,
      variables: { resourceName },
    });

    if (resource.data && resource.data.plan) {
      this.productName = resource.data.plan.product.displayName;
    }
  };

  @logger()
  render() {
    return this.productName || null;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['restFetch']);
