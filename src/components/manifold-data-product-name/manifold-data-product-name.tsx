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
  /** Use auth? */
  @Prop() useAuth?: boolean = false;
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

    const products = await this.restFetch<Catalog.Product[]>({
      service: 'catalog',
      endpoint: `/products?label=${productLabel}`,
      isPublic: !this.useAuth,
    });

    if (products) {
      this.productName = products[0].body.name; // eslint-disable-line prefer-destructuring
    }
  };

  fetchResource = async (resourceName: string) => {
    if (!this.restFetch) {
      return;
    }

    this.productName = undefined;

    const resource = await this.restFetch<Gateway.Resource>({
      service: 'gateway',
      endpoint: `/resources/me/${resourceName}`,
    });

    if (resource) {
      this.productName = resource.product && resource.product.name;
    }
  };

  @logger()
  render() {
    return this.productName || null;
  }
}

Tunnel.injectProps(ManifoldDataProductName, ['restFetch']);
