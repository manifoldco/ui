import { h, FunctionalComponent, Prop, Component } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';
import { PlanEdge, PlanConnection, Plan } from '../../types/graphql';
import logger from '../../utils/logger';
import { Catalog } from '../../types/catalog';

interface PlanButtonProps {
  checked?: boolean;
  isConfigurable?: boolean;
  value?: string;
  onChange?: (e: Event) => void;
}

const PlanButton: FunctionalComponent<PlanButtonProps> = (props, children) => (
  <li class="plan-button">
    <label>
      <input name="plan" type="radio" {...props} />
      <div class="plan-button-inner">
        {children}
        <manifold-icon class="check-icon" icon={check} />
        {props.isConfigurable && (
          <manifold-icon class="custom-icon" icon={sliders} data-hidden={props.checked} />
        )}
      </div>
    </label>
  </li>
);

interface CostProps {
  cost: number;
  plan?: Catalog.ExpandedPlan;
  id: string;
}

const Cost: FunctionalComponent<CostProps> = ({ cost, plan, id }) => (
  <div class="cost">
    <manifold-plan-cost
      defaultCost={cost}
      allFeatures={plan && plan.body.expanded_features}
      selectedFeatures={plan && plan.body.features}
      planId={id}
      compact={true}
    />
  </div>
);

interface PlanMenuProps {
  plans: PlanEdge[];
  oldPlans: Catalog.ExpandedPlan[];
  selectedPlanId?: string;
  selectPlan: Function;
}

const isConfigurable = (plan: Plan) =>
  plan && plan.configurableFeatures ? plan.configurableFeatures.edges.length > 0 : undefined;

// Metered feature costs are scaled 10,000x reletive to plan cost.
const METERED_FEATURE_COST_OFFSET = 10000;

const getMeteredCost = (plan: Plan) => {
  if (plan.meteredFeatures) {
    return (
      plan.meteredFeatures.edges.reduce((total, feature) => {
        // Count only the lowest (first) cost tier for each feature.
        const costTiers = feature.node.numericDetails.costTiers || [];
        return total + (costTiers.length > 0 ? costTiers[0].cost : 0);
      }, 0) / METERED_FEATURE_COST_OFFSET
    );
  }

  return 0;
};

const sortPlans = (plans: PlanEdge[]) => {
  // Sort with metered feature base costs added.
  const sortedMetered = plans.sort((a, b) =>
    a.node.cost + getMeteredCost(a.node) > b.node.cost + getMeteredCost(b.node) ? 1 : -1
  );
  // Group plans with configurable features and put them at the end.
  const nonConfigurable = sortedMetered.filter(plan => !isConfigurable(plan.node));
  const configurable = sortedMetered.filter(plan => isConfigurable(plan.node));
  return [...nonConfigurable, ...configurable];
};

const PlanMenu: FunctionalComponent<PlanMenuProps> = ({
  plans,
  oldPlans,
  selectedPlanId,
  selectPlan,
}) => (
  <ul class="plan-list">
    {sortPlans(plans).map(({ node }) => {
      const { id, displayName, cost } = node;

      return (
        <PlanButton
          checked={selectedPlanId === id}
          value={id}
          onChange={() => selectPlan(id)}
          isConfigurable={isConfigurable(node)}
        >
          {displayName}
          <Cost cost={cost} plan={oldPlans.find(plan => plan.id === id)} id={id} />
        </PlanButton>
      );
    })}
  </ul>
);

const SkeletonPlanMenu = () => (
  <ul class="plan-list">
    {[1, 2, 3, 4].map((_, i) => (
      <PlanButton checked={i === 0}>
        <manifold-skeleton-text>Plan placeholder</manifold-skeleton-text>
        <div class="cost">
          <manifold-skeleton-text>Free</manifold-skeleton-text>
        </div>
      </PlanButton>
    ))}
  </ul>
);

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
