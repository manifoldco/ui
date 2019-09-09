import { h, FunctionalComponent } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';
import { PlanEdge, PlanConfigurableFeatureConnection } from '../../types/graphql';

interface PlanButtonProps {
  checked?: boolean;
  customizable?: boolean;
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
        {props.customizable && (
          <manifold-icon class="custom-icon" icon={sliders} data-hidden={props.checked} />
        )}
      </div>
    </label>
  </li>
);

interface PlanMenuProps {
  plans: PlanEdge[];
  selectedPlanId?: string;
}

const isConfigurable = (configurableFeatures?: PlanConfigurableFeatureConnection) =>
  configurableFeatures && configurableFeatures.edges.length > 0;

const selectPlan = (plans: PlanEdge[], id: string) => plans.find(plan => plan.node.id === id);

const PlanMenu: FunctionalComponent<PlanMenuProps> = ({ plans, selectedPlanId }) => {
  if (plans) {
    return (
      <ul class="plan-list">
        {plans.map(({ node: { id, displayName, configurableFeatures, cost } }) => (
          <PlanButton
            checked={selectedPlanId === id}
            value={id}
            onChange={() => selectPlan(plans, id)}
            customizable={isConfigurable(configurableFeatures || undefined)}
          >
            {displayName}
            <div class="cost">
              <manifold-plan-cost defaultCost={cost} planId={id} compact={true} />
            </div>
          </PlanButton>
        ))}
      </ul>
    );
  }

  // 💀

  return (
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
};

export default PlanMenu;
