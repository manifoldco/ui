import { Component, Prop, FunctionalComponent } from '@stencil/core';
import { Plan } from 'types/Plan';

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
        <mf-icon class="check-icon" icon="check" />
        {props.customizable && (
          <mf-icon class="custom-icon" icon="sliders" data-hidden={props.checked} />
        )}
      </div>
    </label>
  </li>
);

@Component({
  tag: 'plan-menu',
  styleUrl: 'plan-menu.css',
  shadow: true,
})
export class PlanMenu {
  @Prop() plans: Plan[] = [];
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
        {this.allPlans.map(({ id, body: { name, cost, customizable, free } }: Plan) => (
          <PlanButton
            checked={id === this.selectedPlanId}
            value={id}
            onChange={() => this.selectPlan(id)}
            customizable={customizable}
          >
            {name}
            {free ? (
              <mf-badge>Free</mf-badge>
            ) : (
              <div class="cost">
                {customizable && 'Starting at '}
                {$(cost)}&nbsp;<small>/ mo</small>
              </div>
            )}
          </PlanButton>
        ))}
      </ul>
    );
  }
}
