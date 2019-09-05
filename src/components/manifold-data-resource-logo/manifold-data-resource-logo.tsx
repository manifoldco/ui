import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Product } from '../../types/graphql';
import connection from '../../state/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-resource-logo' })
export class ManifoldDataResourceLogo {
  /** _(optional)_ `alt` attribute */
  @Prop() alt?: string;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
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

    if (resourceResp && resourceResp.length) {
      const resource: Marketplace.Resource = resourceResp[0];
      const productId = resource.body.product_id;
      const product = await this.restFetch<Catalog.Product>({
        service: 'catalog',
        endpoint: `/products/${productId}`,
      });

      if (product) {
        // NOTE: Temporary until GraphQL supports resources
        const newProduct = {
          displayName: product.body.name,
          logoUrl: product.body.logo_url,
        };
        this.product = newProduct as Product;
      }
    }
  };

  @logger()
  render() {
    return this.product ? (
      <img src={this.product.logoUrl} alt={this.alt || this.product.displayName} />
    ) : null;
  }
}
