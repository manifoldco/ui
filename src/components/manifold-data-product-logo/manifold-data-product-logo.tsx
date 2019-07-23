import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import { GraphqlResponseBody, GraphqlRequestBody } from '../../utils/graphqlFetch';
import { Product } from '../../types/graphql';
import Tunnel from '../../data/connection';
import { Connection, connections } from '../../utils/connections';

const query = gql`
  query PRODUCT_LOGO($productLabel: String!) {
    product(label: $productLabel) {
      displayName
      logoUrl
    }
  }
`;

@Component({ tag: 'manifold-data-product-logo' })
export class ManifoldDataProductLogo {
  @Element() el: HTMLElement;
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod; // Provided by manifold-connection
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: <T>(body: GraphqlRequestBody) => GraphqlResponseBody<T>;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** _(Depricated)_ Look up product name from resource */
  @Prop() resourceLabel?: string;
  @State() product?: Product;
  @Watch('authToken') refetch() {
    this.fetchProduct(this.productLabel);
  }
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }

  componentWillLoad() {
    this.fetchProduct(this.productLabel);
  }

  fetchProduct = async (productLabel?: string) => {
    if (!this.graphqlFetch || !this.productLabel) {
      return;
    }

    this.product = undefined;
    const variables = { productLabel };
    const { data } = await this.graphqlFetch({ query, variables });

    this.product = data.product;
  };

  render() {
    if (this.resourceLabel) {
      console.warn('DEPRCATION WARNING: Use `manifold-data-resource-logo` instead.');
      return <manifold-data-resource-logo resourceLabel={this.resourceLabel} />;
    }

    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}

Tunnel.injectProps(ManifoldDataProductLogo, ['connection', 'authToken', 'graphqlFetch']);
