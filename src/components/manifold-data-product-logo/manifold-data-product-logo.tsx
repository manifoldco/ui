import { h, Component, Prop, State, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

const GRAPHQL_ENDPOINT = 'https://api.manifold.co/graphql';

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
  @Prop() connection: Connection = connections.prod; // Provided by manifold-connection
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceName?: string;
  @State() product?: any;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct);
  }
  @Watch('resourceName') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  componentWillLoad() {
    if (this.productLabel) this.fetchProduct(this.productLabel);
    if (this.resourceName) this.fetchResource(this.resourceName);
  }

  fetchProduct = async (productLabel: string) => {
    this.product = undefined;
    const response = await fetch(
      GRAPHQL_ENDPOINT,
      withAuth(this.authToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { productLabel } }),
      })
    );
    const { data, error } = await response.json();
    if (error) {
      console.error(error);
    }
    this.product = data.product;
  };

  fetchResource = async (resourceName: string) => {
    this.product = undefined;
    const { catalog, gateway } = this.connection;
    const response = await fetch(
      `${gateway}/resources/me/${resourceName}`,
      withAuth(this.authToken)
    );
    const resource: Gateway.Resource = await response.json();
    const productId = resource.product && resource.product.id;
    const productResp = await fetch(`${catalog}/products/${productId}`, withAuth(this.authToken));
    const product: Catalog.Product = await productResp.json();
    this.product = product;
  };

  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}

Tunnel.injectProps(ManifoldDataProductLogo, ['connection', 'authToken']);
