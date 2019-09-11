import { h, FunctionalComponent, Prop, Component } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';
import { PlanEdge, PlanConfigurableFeatureConnection, PlanConnection } from '../../types/graphql';
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

const isConfigurable = (configurableFeatures?: PlanConfigurableFeatureConnection | null) =>
  configurableFeatures ? configurableFeatures.edges.length > 0 : undefined;

// Push configurable plans to the end
const sortPlans = (plans: PlanEdge[]) =>
  plans.sort(a => (isConfigurable(a.node && a.node.configurableFeatures) ? 1 : 0));

const PlanMenu: FunctionalComponent<PlanMenuProps> = ({
  plans,
  oldPlans,
  selectedPlanId,
  selectPlan,
}) => (
  <ul class="plan-list">
    {sortPlans(plans).map(({ node: { id, displayName, configurableFeatures, cost } }) => (
      <PlanButton
        checked={selectedPlanId === id}
        value={id}
        onChange={() => selectPlan(id)}
        isConfigurable={isConfigurable(configurableFeatures)}
      >
        {displayName}
        <Cost cost={cost} plan={oldPlans.find(plan => plan.id === id)} id={id} />
      </PlanButton>
    ))}
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
