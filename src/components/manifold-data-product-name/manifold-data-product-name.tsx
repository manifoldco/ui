import { Component, Prop, State, Element, Watch } from '@stencil/core';

import connection from '../../state/connection';
import { GraphqlFetch, GraphqlError } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

import productNameQuery from './product-name.graphql';
import resourceProductNameQuery from './resource-product-name.graphql';
import { ProductNameQuery, ResourceProductNameQuery } from '../../types/graphql';

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

    const { data, errors } = await this.graphqlFetch<ProductNameQuery>({
      query: productNameQuery,
      variables: { productLabel },
      element: this.el,
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

    const { data, errors } = await this.graphqlFetch<ResourceProductNameQuery>({
      query: resourceProductNameQuery,
      variables: { resourceLabel },
      element: this.el,
    });

    if (data && data.resource && data.resource.plan && data.resource.plan.product) {
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
