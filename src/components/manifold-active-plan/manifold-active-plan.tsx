import { h, Component, State, Prop, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';
@Component({
  tag: 'manifold-active-plan',
  styleUrl: 'plan-selector.css',
  shadow: true,
})
export class ManifoldActivePlan {
  @Prop() isExistingResource?: boolean;
  @Prop() plans?: Catalog.ExpandedPlan[];
  @Prop() product?: Catalog.Product;
  @Prop() regions?: string[];
  @Prop() selectedResource?: Gateway.Resource;
  @State() selectedPlanId: string;
  @Watch('plans') plansChange(newPlans: Catalog.ExpandedPlan[]) {
    if (this.selectedResource && this.selectedResource.plan && this.selectedResource.plan.id) {
      this.selectPlan(this.selectedResource.plan.id);
    } else {
      this.selectPlan(newPlans[0].id);
    }
  }
  @Watch('selectedResource') resourceChange(newResource: Gateway.Resource) {
    if (newResource && newResource.plan && newResource.plan.id) {
      this.selectPlan(newResource.plan.id);
    }
  }

  selectPlan = (planId: string) => {
    this.selectedPlanId = planId;
  };

  get selectedPlan() {
    if (!this.plans) {
      return undefined;
    }
    if (!this.selectedPlanId) {
      return this.plans[0];
    }
    return this.plans.find(({ id }) => id === this.selectedPlanId);
  }

  @logger()
  render() {
    const resourceRegion =
      (this.selectedResource && this.selectedResource.region && this.selectedResource.region.id) ||
      undefined;

    return [
      <manifold-plan-menu
        plans={this.plans}
        selectedPlanId={this.selectedPlanId}
        selectPlan={this.selectPlan}
      />,
      <manifold-plan-details
        scrollLocked={true}
        isExistingResource={this.isExistingResource}
        plan={this.selectedPlan}
        product={this.product}
        regions={this.regions}
        resourceFeatures={this.selectedResource && this.selectedResource.features}
        resourceRegion={resourceRegion}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-plan-details>,
    ];
  }
}
