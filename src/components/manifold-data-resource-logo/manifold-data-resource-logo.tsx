import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Product } from '../../types/graphql';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import { Marketplace } from '../../types/marketplace';

@Component({ tag: 'manifold-data-resource-logo' })
export class ManifoldDataResourceLogo {
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
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
    if (!this.restFetch || !this.resourceLabel) {
      return;
    }

    this.product = undefined;
    const resourceResp = await this.restFetch<Marketplace.Resource[]>(
      'marketplace',
      `/resources/?me&label=${resourceLabel}`
    );

    if (resourceResp instanceof Error) {
      console.error(resourceResp);
      return;
    }

    const resource: Marketplace.Resource = resourceResp[0];
    const productId = resource.body.product_id;
    const productResp = await this.restFetch<Catalog.Product>('catalog', `/products/${productId}`);

    if (productResp instanceof Error) {
      console.error(productResp);
      return;
    }

    // NOTE: Temporary util GraphQL supports resources
    const newProduct = {
      displayName: productResp.body.name,
      logoUrl: productResp.body.logo_url,
    };
    this.product = newProduct as Product;
  };

  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}

Tunnel.injectProps(ManifoldDataResourceLogo, ['restFetch']);
