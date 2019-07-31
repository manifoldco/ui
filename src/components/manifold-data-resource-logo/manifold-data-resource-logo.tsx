import { h, Component, Prop, State, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import { Product } from '../../types/graphql';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-resource-logo' })
export class ManifoldDataResourceLogo {
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod; // Provided by manifold-connection
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** Look up product logo from resource */
  @Prop() resourceLabel?: string;
  @State() product?: Product;

  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  componentWillLoad() {
    this.fetchResource(this.resourceLabel);
  }

  fetchResource = async (resourceLabel?: string) => {
    if (!this.connection || !this.resourceLabel) {
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
    this.product = newProduct as Product;
  };

  @logger()
  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}

Tunnel.injectProps(ManifoldDataResourceLogo, ['connection', 'authToken']);
