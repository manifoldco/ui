import { Component, Prop, State, Element, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod; // Provided by manifold-connection
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
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
    if (!this.connection) {
      return;
    }

    this.productName = undefined;
    const { catalog } = this.connection;
    const response = await fetch(
      `${catalog}/products?label=${productLabel}`,
      withAuth(this.authToken)
    );
    const products: Catalog.Product[] = await response.json();
    this.productName = products[0].body.name; // eslint-disable-line prefer-destructuring
  };

  fetchResource = async (resourceName: string) => {
    if (!this.connection) {
      return;
    }

    this.productName = undefined;
    const { gateway } = this.connection;
    const response = await fetch(
      `${gateway}/resources/me/${resourceName}`,
      withAuth(this.authToken)
    );
    const resource: Gateway.Resource = await response.json();
    this.productName = resource.product && resource.product.name;
  };

  render() {
    return this.productName || null;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['connection', 'authToken']);
