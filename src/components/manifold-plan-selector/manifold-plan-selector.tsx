import { h, Component, State, Prop, Element, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-plan-selector' })
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Specify region order */
  @Prop() regions?: string;
  /** Is this tied to an existing resource? */
  @Prop() resourceName?: string;
  @State() product?: Catalog.Product;
  @State() plans?: Catalog.Plan[];
  @State() resource?: Gateway.Resource;
  @State() parsedRegions: string[];
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProductByLabel(newProduct);
  }
  @Watch('resourceName') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }
  @Watch('regions') regionsChange(newRegions: string) {
    if (newRegions) this.parsedRegions = this.parseRegions(newRegions);
  }

  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProductByLabel(this.productLabel);
    } else if (this.resourceName) {
      this.fetchResource(this.resourceName);
    }
  }

  async fetchProductByLabel(productLabel: string) {
    this.product = undefined;
    if (this.regions) this.parsedRegions = this.parseRegions(this.regions);
    const { catalog } = this.connection;
    const productsResp = await fetch(`${catalog}/products/?label=${productLabel}`, withAuth());
    const products: Catalog.ExpandedProduct[] = await productsResp.json();
    this.product = products[0]; // eslint-disable-line prefer-destructuring
    this.fetchPlans(products[0].id);
  }

  async fetchPlans(productId: string) {
    this.plans = undefined;
    const { catalog } = this.connection;
    const plansResp = await fetch(`${catalog}/plans/?product_id=${productId}`, withAuth());
    const plans: Catalog.ExpandedPlan[] = await plansResp.json();
    this.plans = [...plans].sort((a, b) => a.body.cost - b.body.cost);
  }

  async fetchResource(resourceName: string) {
    this.resource = undefined;
    this.product = undefined;
    const { catalog, gateway } = this.connection;
    const response = await fetch(`${gateway}/resources/me/${resourceName}`, withAuth());
    const resource: Gateway.Resource = await response.json();
    this.resource = resource;
    if (!resource.product) return;
    const productResp = await fetch(`${catalog}/products/${resource.product.id}`, withAuth());
    const product: Catalog.Product = await productResp.json();
    this.product = product;
    this.fetchPlans(product.id);
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

Tunnel.injectProps(ManifoldPlanSelector, ['connection']);
