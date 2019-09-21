import { h, Component, State, Prop, Watch } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Product, PlanConnection } from '../../types/graphql';
@Component({
  tag: 'manifold-active-plan',
  styleUrl: 'plan-selector.css',
  shadow: true,
})
export class ManifoldActivePlan {
  @Prop() isExistingResource?: boolean;
  @Prop() plans?: PlanConnection;
  @Prop() product?: Product;
  @Prop() regions?: string[];
  @Prop() selectedResource?: Gateway.Resource;
  @State() selectedPlanId: string;
  @Watch('plans') plansChange(newPlans: PlanConnection) {
    if (this.selectedResource && this.selectedResource.plan && this.selectedResource.plan.id) {
      this.selectPlan(this.selectedResource.plan.id);
    } else {
      this.selectPlan(newPlans.edges[0].node.id);
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
      return this.plans.edges[0].node;
    }
    const plan = this.plans.edges.find(({ node }) => node.id === this.selectedPlanId);

    return plan && plan.node;
  }

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
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
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-plan-details>,
    ];
  }
}
