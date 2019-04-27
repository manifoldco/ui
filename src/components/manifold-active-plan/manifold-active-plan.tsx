import { Component, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'manifold-active-plan',
  styleUrl: 'plan-selector.css',
  shadow: true,
})
export class ManifoldActivePlan {
  @Prop() hideCta?: boolean;
  @Prop() isExistingResource?: boolean;
  @Prop() linkFormat?: string;
  @Prop() plans?: Catalog.ExpandedPlan[];
  @Prop() preserveEvent: boolean = false;
  @Prop() product?: Catalog.Product;
  @Prop() regions?: string[];
  @Prop() selectedResource?: Gateway.Resource;
  @State() selectedPlanId: string;
  @Watch('selectedResource') resourceChange(newResource: Gateway.Resource) {
    if (newResource && newResource.plan && newResource.plan.id) {
      this.selectPlan(newResource.plan.id);
    }
  }

  componentWillLoad() {
    if (this.selectedResource && this.selectedResource.plan && this.selectedResource.plan.id) {
      this.selectPlan(this.selectedResource.plan.id);
    } else if (Array.isArray(this.plans)) {
      this.selectPlan(this.plans[0].id);
    }
  }

  selectPlan = (planId: string) => {
    this.selectedPlanId = planId;
  };

  get selectedPlan() {
    if (!this.plans) return undefined;
    if (!this.selectedPlanId) return this.plans[0];
    return this.plans.find(({ id }) => id === this.selectedPlanId);
  }

  render() {
    return [
      <manifold-plan-menu
        plans={this.plans}
        selectedPlanId={this.selectedPlanId}
        selectPlan={this.selectPlan}
      />,
      <manifold-plan-details
        hideCta={this.hideCta}
        isExistingResource={this.isExistingResource}
        linkFormat={this.linkFormat}
        plan={this.selectedPlan}
        preserveEvent={this.preserveEvent}
        product={this.product}
        regions={this.regions}
        resourceFeatures={this.selectedResource && this.selectedResource.features}
      />,
    ];
  }
}
