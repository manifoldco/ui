import { Component, Prop, FunctionalComponent } from '@stencil/core';

const $ = (amount: number, options: object = {}) => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(
    amount / 100
  );
};

const PlanButton: FunctionalComponent<{
  checked?: boolean;
  customizable?: boolean;
  value: string;
  onChange: (e: Event) => void;
}> = (props, children) => (
  <li class="plan-button">
    <label>
      <input name="plan" type="radio" {...props} />
      <div class="plan-button-inner">
        {children}
        <manifold-icon class="check-icon" icon="check" />
        {props.customizable && (
          <manifold-icon class="custom-icon" icon="sliders" data-hidden={props.checked} />
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
  @Prop() plans: Catalog.ExpandedPlan[] = [];
  @Prop() selectedPlanId: string;
  @Prop() selectPlan: Function;

  get customPlans() {
    return Array.isArray(this.plans)
      ? this.plans.filter(({ body: { customizable } }) => customizable === true)
      : [];
  }

  get fixedPlans() {
    return Array.isArray(this.plans)
      ? this.plans.filter(({ body: { customizable } }) => customizable !== true)
      : [];
  }

  get allPlans() {
    return [...this.fixedPlans, ...this.customPlans];
  }

  render() {
    return (
      <ul class="plan-list">
        {this.allPlans.map(
          ({ id, body: { name, cost, customizable, free } }: Catalog.ExpandedPlan) => (
            <PlanButton
              checked={id === this.selectedPlanId}
              value={id}
              onChange={() => this.selectPlan(id)}
              customizable={customizable}
            >
              {name}
              {free ? (
                <manifold-badge>Free</manifold-badge>
              ) : (
                <div class="cost">
                  {customizable && 'Starting at '}
                  {$(cost)}&nbsp;<small>/ mo</small>
                </div>
              )}
            </PlanButton>
          )
        )}
      </ul>
    );
  }
}
