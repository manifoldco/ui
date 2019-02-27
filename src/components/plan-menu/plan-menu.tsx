import { Component, Prop, FunctionalComponent } from '@stencil/core';
import { Plan } from 'types/Plan';

const $ = (amount: number, options: object = {}) => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options }).format(
    amount / 100
  );
};

const PlanButton: FunctionalComponent<{
  checked: boolean;
  value: string;
  onChange: (e: Event) => void;
}> = (props, children) => (
  <li class="plan-button">
    <label>
      <input name="plan" type="radio" {...props} />
      <div class="plan-button-inner">
        {children}
        <mf-icon class="check-icon" icon="check" />
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

  render() {
    return (
      <ul class="plan-list">
        {this.plans.map(({ id, body }: Plan) => (
          <PlanButton
            checked={id === this.selectedPlanId}
            value={id}
            onChange={() => this.selectPlan(id)}
          >
            {body.name}
            <div class="cost">
              {$(body.cost)}&nbsp;<small>/ mo</small>
            </div>
          </PlanButton>
        ))}
      </ul>
    );
  }
}
