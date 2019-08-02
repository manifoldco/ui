import { h, Component, Prop, FunctionalComponent } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';
import { Catalog } from '../../types/catalog';
import logger from '../../utils/logger';

const PlanButton: FunctionalComponent<{
  checked?: boolean;
  customizable?: boolean;
  value?: string;
  onChange?: (e: Event) => void;
}> = (props, children) => (
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

@Component({
  tag: 'manifold-plan-menu',
  styleUrl: 'plan-menu.css',
  shadow: true,
})
export class ManifoldPlanMenu {
  @Prop() plans?: Catalog.ExpandedPlan[];
  @Prop() selectedPlanId?: string;
  @Prop() selectPlan: Function = () => {};

  @logger()
  render() {
    if (this.plans) {
      return (
        <ul class="plan-list">
          {this.plans.map(
            ({
              id,
              body: { name, customizable, cost, defaultCost, expanded_features = [] },
            }: Catalog.ExpandedPlan) => (
              <PlanButton
                checked={this.selectedPlanId === id}
                value={id}
                onChange={() => this.selectPlan(id)}
                customizable={customizable}
              >
                {name}
                <div class="cost">
                  <manifold-plan-cost
                    allFeatures={expanded_features}
                    defaultCost={defaultCost || cost}
                    planId={id}
                    compact={true}
                  />
                </div>
              </PlanButton>
            )
          )}
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
