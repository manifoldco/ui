import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import graphqlFetch from '../../utils/graphqlFetch';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
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
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceLabel?: string;
  @State() product?: any;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  componentWillLoad() {
    if (this.productLabel) this.fetchProduct(this.productLabel);
    if (this.resourceLabel) this.fetchResource(this.resourceLabel);
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.connection) {
      return;
    }

    this.product = undefined;
    const variables = { productLabel };
    const { data, error } = await graphqlFetch({ query, variables });
    if (error) {
      console.error(error);
    }
    this.product = data.product;
  };

  fetchResource = async (resourceLabel: string) => {
    if (!this.connection) {
      return;
    }

    this.product = undefined;
    const { catalog, gateway } = this.connection;
    const response = await fetch(
      `${gateway}/resources/me/${resourceLabel}`,
      withAuth(this.authToken)
    );
    const resource: Gateway.Resource = await response.json();
    const productId = resource.product && resource.product.id;
    const productResp = await fetch(`${catalog}/products/${productId}`, withAuth(this.authToken));
    const product: Catalog.Product = await productResp.json();

    // NOTE: Temporary util GraphQL supports resources
    const newProduct = {
      displayName: product.body.name,
      logoUrl: product.body.logo_url,
    };
    this.product = newProduct;
  };

  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}

Tunnel.injectProps(ManifoldDataProductLogo, ['connection', 'authToken']);
