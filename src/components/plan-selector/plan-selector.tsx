import { Component, State, Prop } from '@stencil/core';

@Component({
  tag: 'plan-selector',
  styleUrl: 'plan-selector.css',
  shadow: true,
})
export class PlanSelector {
  @Prop() product: Catalog.ExpandedProduct;
  @Prop() plans: Catalog.ExpandedPlan[];
  @State() selectedPlanId: string;

  componentWillLoad() {
    if (this.plans.length) {
      this.selectPlan(this.plans[0].id);
    }
  }

  selectPlan = (planId: string) => {
    this.selectedPlanId = planId;
  };

  render() {
    return [
      <plan-menu
        plans={this.plans}
        selected-plan-id={this.selectedPlanId}
        selectPlan={this.selectPlan}
      />,
      <div>
        <plan-details
          product={this.product}
          plan={this.plans.find(plan => plan.id === this.selectedPlanId)}
        />
      </div>,
    ];
  }
}
