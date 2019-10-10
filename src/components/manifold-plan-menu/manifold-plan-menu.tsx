import { h, FunctionalComponent, Prop, Component } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';

import { PlanEdge } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

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

@Component({
  tag: 'manifold-plan-menu',
  styleUrl: 'manifold-plan-menu.css',
  shadow: true,
})
export class ManifoldPlanMenu {
  @Prop() plans?: PlanEdge[];
  @Prop() selectedPlanId?: string;
  @Prop() selectPlan: Function = () => {};

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (this.plans) {
      // TODO: re-add custom plans when GraphQL supports resource features
      const noCustomPlans = this.plans.filter(
        ({ node: { configurableFeatures } }) =>
          !configurableFeatures || configurableFeatures.edges.length === 0
      );

      return (
        <ul class="plan-list">
          {noCustomPlans.map(({ node: plan }) => (
            <PlanButton
              checked={this.selectedPlanId === plan.id}
              value={plan.id}
              onChange={() => this.selectPlan(plan.id)}
              isConfigurable={
                (plan.configurableFeatures && plan.configurableFeatures.edges.length > 0) || false
              }
            >
              {plan.displayName}
              <div class="cost">
                <manifold-plan-cost compact={true} plan={plan} />
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
  }
}
