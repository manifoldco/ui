import { Component, State, Prop, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection, connections, Env } from '../../utils/connections';

const byCost = (a: Catalog.ExpandedPlan, b: Catalog.ExpandedPlan) =>
  a.body.cost < b.body.cost ? -1 : 1;

@Component({
  tag: 'manifold-plan-selector',
  shadow: true,
})
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  @Prop() connection: Connection = connections[Env.Prod];
  @Prop() resourceId?: string;
  @Prop() hideProvisionButton?: boolean;
  @Prop() productId: string;
  @State() product: Catalog.ExpandedProduct;
  @State() plans: Catalog.Plan[];

  async componentWillLoad() {
    await fetch(`${this.connection.catalog}/products/${this.productId}`)
      .then(response => response.json())
      .then(data => {
        this.product = data;
      });
    await fetch(`${this.connection.catalog}/plans?product_id=${this.productId}`)
      .then(response => response.json())
      .then(data => {
        this.plans = data.sort(byCost);
      });
  }

  render() {
    if (!this.product || !this.plans) return null;
    return (
      <manifold-active-plan
        product={this.product}
        plans={this.plans}
        isExistingResource={!!this.resourceId}
        hideProvisionButton={this.hideProvisionButton}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlanSelector, ['connection']);
