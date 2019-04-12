import { Component, State, Prop, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection, connections, Env } from '../../utils/connections';

@Component({
  tag: 'manifold-plan-selector',
  shadow: true,
})
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  @Prop() connection: Connection = connections[Env.Prod];
  @Prop() resourceId?: string;
  @Prop() hideProvisionButton?: boolean;
  @Prop() productLabel: string;
  @State() product: Catalog.ExpandedProduct;
  @State() plans: Catalog.Plan[];

  async componentWillLoad() {
    await fetch(`${this.connection.catalog}/products/?label=${this.productLabel}`)
      .then(response => response.json())
      .then((products: Catalog.ExpandedProduct[]) => {
        const [product] = products;
        this.product = product
        fetch(`${this.connection.catalog}/plans/?product_id=${product.id}`)
          .then(response => response.json())
          .then((plans: Catalog.ExpandedPlan[]) => {
            this.plans = [...plans.sort((a, b) => a.body.cost - b.body.cost)]
          });
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
