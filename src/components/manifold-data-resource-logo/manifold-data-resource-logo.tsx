import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Product } from '../../types/graphql';
import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';

@Component({ tag: 'manifold-data-resource-logo' })
export class ManifoldDataResourceLogo {
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
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
    const resourceResp = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (resourceResp instanceof Error) {
      console.error(resourceResp);
      return;
    }

    const resource: Marketplace.Resource = resourceResp[0];
    const productId = resource.body.product_id;
    const productResp = await this.restFetch<Catalog.Product>({
      service: 'catalog',
      endpoint: `/products/${productId}`,
    });

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
