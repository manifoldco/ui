import { h, FunctionalComponent } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';
import { PlanEdge, Plan } from '../../types/graphql';
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

export const isConfigurable = (plan: Plan) =>
  plan && plan.configurableFeatures ? plan.configurableFeatures.edges.length > 0 : undefined;

// Metered feature costs are scaled 10,000x reletive to plan cost.
const METERED_FEATURE_COST_OFFSET = 10000;

export const getMeteredCost = (plan: Plan) => {
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

export const sortPlans = (plans: PlanEdge[]) => {
  // Sort with metered costs after base cost.
  const sortedMetered = plans.sort((a, b) => {
    if (a.node.cost === b.node.cost) {
      return getMeteredCost(a.node) - getMeteredCost(b.node);
    }
    return 0;
  });

  // Group plans with configurable features and put them at the end.
  const nonConfigurable = sortedMetered.filter(plan => !isConfigurable(plan.node));
  const configurable = sortedMetered.filter(plan => isConfigurable(plan.node));
  return [...nonConfigurable, ...configurable];
};

export const PlanMenu: FunctionalComponent<PlanMenuProps> = ({
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

export const SkeletonPlanMenu = () => (
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
