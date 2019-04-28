import { Component, Prop, State, Element, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod; // Provided by manifold-connection
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Look up product name from resource */
  @Prop() resourceName?: string;
  @State() productName?: string;
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
    this.productName = undefined; // Enable loading state on change
    const { catalog } = this.connection;
    const response = await fetch(`${catalog}/products?label=${productLabel}`, withAuth());
    const products: Catalog.Product[] = await response.json();
    this.productName = products[0].body.name; // eslint-disable-line prefer-destructuring
  };

  fetchResource = async (resourceName: string) => {
    this.productName = undefined; // Enable loading state on change
    const { gateway } = this.connection;
    const response = await fetch(`${gateway}/resources/me/${resourceName}`, withAuth());
    const resource: Gateway.Resource = await response.json();
    this.productName = resource.product && resource.product.name;
  };

  render() {
    return this.productName || <slot />;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['connection']);
