import { Component, Prop, State, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
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
    if (!this.restFetch) {
      return;
    }

    this.productName = undefined;

    const response = await this.restFetch<Catalog.Product[]>(
      'catalog',
      `/products?label=${productLabel}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    const products: Catalog.Product[] = await response;
    this.productName = products[0].body.name; // eslint-disable-line prefer-destructuring
  };

  fetchResource = async (resourceName: string) => {
    if (!this.restFetch) {
      return;
    }

    this.productName = undefined;

    const response = await this.restFetch<Gateway.Resource>(
      'gateway',
      `/resources/me/${resourceName}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    const resource: Gateway.Resource = await response;
    this.productName = resource.product && resource.product.name;
  };

  render() {
    return this.productName || null;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['restFetch']);
