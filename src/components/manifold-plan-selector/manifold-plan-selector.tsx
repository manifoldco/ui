import { h, Component, State, Prop, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import { Marketplace } from '../../types/marketplace';

@Component({ tag: 'manifold-plan-selector' })
export class ManifoldPlanSelector {
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
  /** Specify region order */
  @Prop() regions?: string;
  /** Is this tied to an existing resource? */
  @Prop() resourceLabel?: string;
  @State() product?: Catalog.Product;
  @State() plans?: Catalog.Plan[];
  @State() resource?: Gateway.Resource;
  @State() parsedRegions: string[];
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProductByLabel(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }
  @Watch('regions') regionsChange(newRegions: string) {
    if (newRegions) {
      this.parsedRegions = this.parseRegions(newRegions);
    }
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProductByLabel(this.productLabel);
    } else if (this.resourceLabel) {
      this.fetchResource(this.resourceLabel);
    }
  }

  async fetchProductByLabel(productLabel: string) {
    if (!this.restFetch) {
      return;
    }

    this.product = undefined;
    if (this.regions) {
      this.parsedRegions = this.parseRegions(this.regions);
    }

    const response = await this.restFetch<Catalog.ExpandedProduct[]>(
      'catalog',
      `/products/?label=${productLabel}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.product = response[0]; // eslint-disable-line prefer-destructuring
    this.fetchPlans(response[0].id);
  }

  async fetchPlans(productId: string) {
    if (!this.restFetch) {
      return;
    }

    this.plans = undefined;

    const response = await this.restFetch<Catalog.ExpandedPlan[]>(
      'catalog',
      `/plans/?product_id=${productId}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.plans = [...response].sort((a, b) => a.body.cost - b.body.cost);
  }

  async fetchResource(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    this.resource = undefined;

    const response = await this.restFetch<Marketplace.Resource[]>(
      'marketplace',
      `/resources/?me&label=${resourceLabel}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    const resource = response[0];
    if (!resource || !resource.body.product_id) {
      console.error('No resource found');
      return;
    }

    this.fetchPlans(resource.body.product_id);
  }

  parseRegions(regions: string) {
    return regions.split(',').map(region => region.trim().toLowerCase());
  }

  render() {
    return (
      <manifold-active-plan
        plans={this.plans}
        product={this.product}
        regions={this.parsedRegions}
        selectedResource={this.resource}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}

Tunnel.injectProps(ManifoldPlanSelector, ['restFetch']);
