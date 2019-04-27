import { Component, Prop, FunctionalComponent } from '@stencil/core';
import { check, sliders } from '@manifoldco/icons';

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

  sortPlans(plans: Catalog.ExpandedPlan[]) {
    return [...plans].sort((a, b) => {
      const aIndex = a.body.customizable ? plans.length : 0;
      const bIndex = b.body.customizable ? plans.length : 0;
      return aIndex - bIndex;
    });
  }

  render() {
    if (this.plans) {
      const plans = this.sortPlans(this.plans);

      return (
        <ul class="plan-list">
          {plans.map(
            ({
              id,
              body: { name, customizable, expanded_features = [] },
            }: Catalog.ExpandedPlan) => (
              <PlanButton
                checked={this.selectedPlanId === id}
                value={id}
                onChange={() => this.selectPlan(id)}
                customizable={customizable}
              >
                {name}
                <div class="cost">
                  <manifold-plan-cost allFeatures={expanded_features} planId={id} compact={true} />
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
