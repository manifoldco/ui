import { h, Prop, Component } from '@stencil/core';

import { PlanMenu, SkeletonPlanMenu } from './PlanMenu';

import { PlanConnection } from '../../types/graphql';
import logger from '../../utils/logger';
import { Catalog } from '../../types/catalog';

@Component({
  tag: 'manifold-plan-menu',
  styleUrl: 'plan-menu.css',
  shadow: true,
})
export class ManifoldPlanMenu {
  @Prop() plans?: PlanConnection;
  @Prop() oldPlans: Catalog.ExpandedPlan[] = [];
  @Prop() selectedPlanId?: string;
  @Prop() selectPlan: Function = () => {};

  @logger()
  render() {
    if (this.plans) {
      return (
        <PlanMenu
          plans={this.plans.edges}
          oldPlans={this.oldPlans}
          selectedPlanId={this.selectedPlanId}
          selectPlan={this.selectPlan}
        />
      );
    }

    // 💀
    return <SkeletonPlanMenu />;
  }
}
