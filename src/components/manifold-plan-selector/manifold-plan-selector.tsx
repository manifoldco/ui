import { Component, State, Prop } from '@stencil/core';

const byCost = (a: Catalog.ExpandedPlan, b: Catalog.ExpandedPlan) =>
  a.body.cost < b.body.cost ? -1 : 1;

@Component({
  tag: 'manifold-plan-selector',
  shadow: true,
})
export class ManifoldPlanSelector {
  @Prop() productId: string;
  @State() product: Catalog.ExpandedProduct;
  @State() plans: Catalog.Plan[];

  async componentWillLoad() {
    await fetch(`https://api.catalog.stage.manifold.co/v1/products/${this.productId}`)
      .then(response => response.json())
      .then(data => {
        this.product = data;
      });
    await fetch(`https://api.catalog.stage.manifold.co/v1/plans?product_id=${this.productId}`)
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
