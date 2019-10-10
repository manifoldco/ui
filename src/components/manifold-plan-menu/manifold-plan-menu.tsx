import { h, Prop, Component } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';

import { PlanEdge } from '../../types/graphql';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-plan-menu',
  styleUrl: 'manifold-plan-menu.css',
  shadow: true,
})
export class ManifoldPlanMenu {
  @Prop() plans?: PlanEdge[];
  @Prop() selectedPlanId?: string;
  @Prop() selectPlan: (planId: string) => void = () => null;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (this.plans) {
      // TODO: re-add configurable plans when GraphQL supports resource features
      const TEMP_HIDE_CONFIGURABLE_PLANS = this.plans.filter(
        ({ node: { configurableFeatures } }) =>
          !configurableFeatures || configurableFeatures.edges.length === 0
      );

      return (
        <ul class="plan-list">
          {TEMP_HIDE_CONFIGURABLE_PLANS.map(({ node: plan }) => {
            const isConfigurable =
              plan.configurableFeatures && plan.configurableFeatures.edges.length > 0;
            return (
              <li class="plan-button">
                <label>
                  <input
                    name="plan"
                    type="radio"
                    checked={plan.id === this.selectedPlanId}
                    onChange={() => this.selectPlan(plan.id)}
                    value={plan.id}
                  />
                  <div class="plan-button-inner">
                    {plan.displayName}
                    <div class="cost">
                      <manifold-plan-cost compact={true} plan={plan} />
                    </div>
                    <manifold-icon class="check-icon" icon={check} />
                    {isConfigurable && (
                      <manifold-icon
                        class="custom-icon"
                        icon={sliders}
                        data-hidden={plan.id === this.selectedPlanId}
                      />
                    )}
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      );
    }

    // 💀
    return (
      <ul class="plan-list">
        {[1, 2, 3, 4].map((_, i) => (
          <li class="plan-button">
            <label>
              <input name="plan" type="radio" checked={i === 0} />
              <manifold-skeleton-text>Plan placeholder</manifold-skeleton-text>
              <div class="cost">
                <manifold-skeleton-text>Free</manifold-skeleton-text>
              </div>
            </label>
          </li>
        ))}
      </ul>
    );
  }
}
