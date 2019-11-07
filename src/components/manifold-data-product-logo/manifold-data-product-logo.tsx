import { h, Component, Element, Prop, State, Watch } from '@stencil/core';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import { Product, ProductLogoQuery, ProductLogoQueryVariables } from '../../types/graphql';
import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

import productLogoQuery from './product-logo.graphql';

@Component({ tag: 'manifold-data-product-logo' })
export class ManifoldDataProductLogo {
  @Element() el: HTMLElement;
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel: string;
  /** _(Deprecated)_ Look up product logo from resource */
  @Prop() resourceLabel?: string;
  @State() product?: Pick<Product, 'displayName' | 'logoUrl'>;

  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }

  @loadMark()
  componentWillLoad() {
    this.fetchProduct(this.productLabel);
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.graphqlFetch || !this.productLabel) {
      return;
    }

    this.product = undefined;
    const variables: ProductLogoQueryVariables = { productLabel };
    const { data } = await this.graphqlFetch<ProductLogoQuery>({
      query: productLogoQuery,
      variables,
      element: this.el,
    });

    this.product = (data && data.product) || undefined;
  };

  @logger()
  render() {
    if (this.resourceLabel) {
      console.warn('DEPRECATION WARNING: Use `manifold-data-resource-logo` instead.');
      return <manifold-data-resource-logo resourceLabel={this.resourceLabel} />;
    }

    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}
