import { Component, Prop, State, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-product-name' })
export class ManifoldDataProductName {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
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

  componentDidLoad() {
    if (this.productLabel) {
      return this.fetchProduct(this.productLabel);
    }
    if (this.resourceLabel) {
      return this.fetchResource(this.resourceLabel);
    }
    return null;
  }

  fetchProduct = async (productLabel: string) => {
    if (!this.restFetch) {
      return;
    }

    this.productName = undefined;

    const response = await this.restFetch<Catalog.Product[]>({
      service: 'catalog',
      endpoint: `/products?label=${productLabel}`,
    });

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

    const response = await this.restFetch<Gateway.Resource>({
      service: 'gateway',
      endpoint: `/resources/me/${resourceName}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    const resource: Gateway.Resource = await response;
    this.productName = resource.product && resource.product.name;
  };

  @logger()
  render() {
    return this.productName || null;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['restFetch']);
