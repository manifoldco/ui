import { Component, State, Prop, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

const byCost = (a: Catalog.ExpandedPlan, b: Catalog.ExpandedPlan) =>
  a.body.cost < b.body.cost ? -1 : 1;

@Component({
  tag: 'manifold-plan-selector',
  shadow: true,
})
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  @Prop() connection: Connection;
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
    return <plan-selector product={this.product} plans={this.plans} />;
  }
}

Tunnel.injectProps(ManifoldPlanSelector, ['connection']);
