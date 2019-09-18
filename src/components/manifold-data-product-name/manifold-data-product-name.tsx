import { Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceLabel?: string;
  @State() errors?: GraphqlError[];
  @State() productName?: string;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  @loadMark()
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

    const { data, errors } = await this.graphqlFetch({
      query: gql`
        query PRODUCT_NAME($productLabel: String!) {
          product(label: $productLabel) {
            displayName
          }
        }
      `,
      variables: { productLabel },
    });

    if (data && data.product) {
      this.productName = data.product.displayName;
    } else if (errors) {
      this.errors = errors;
    }
  };

  fetchResource = async (resourceLabel: string) => {
    if (!this.graphqlFetch) {
      return;
    }

    this.productName = undefined;

    const { data, errors } = await this.graphqlFetch({
      query: gql`
        query RESOURCE($resourceLabel: String!) {
          resource(label: $resourceLabel) {
            plan {
              product {
                displayName
              }
            }
          }
        }
      `,
      variables: { resourceLabel },
    });

    if (data && data.resource && data.resource.plan) {
      this.productName = data.resource.plan.product.displayName;
    } else if (errors) {
      this.errors = errors;
    }
  };

  @logger()
  render() {
    if (this.errors) {
      return 'Product name not found';
    }

    return this.productName || null;
  }
}
