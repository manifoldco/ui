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
      return (
        <ul class="plan-list">
          {this.plans.map(({ node: plan }, i) => {
            const isSelected = this.selectedPlanId ? plan.id === this.selectedPlanId : i === 0;
            const isConfigurable =
              plan.configurableFeatures && plan.configurableFeatures.edges.length > 0;
            return (
              <li class="plan-button">
                <label>
                  <input
                    name="plan"
                    type="radio"
                    checked={isSelected}
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
                      <manifold-icon class="custom-icon" icon={sliders} data-hidden={isSelected} />
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
              <div class="plan-button-inner">
                <manifold-skeleton-text>Plan placeholder</manifold-skeleton-text>
                <div class="cost">
                  <manifold-skeleton-text>Free</manifold-skeleton-text>
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    );
  }
}
