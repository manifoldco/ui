import { Component, Element, Prop } from '@stencil/core';
import { $ } from '../../utils/currency';

@Component({ tag: 'manifold-cost-display', styleUrl: 'manifold-cost-display.css', shadow: true })
export class ManifoldCostDisplay {
  @Element() el: HTMLElement;
  @Prop() baseCost?: number;
  @Prop() compact?: boolean = false;
  @Prop() isCustomizable?: boolean = false;
  @Prop() measuredCosts: [number, string][] = [];

  get isMeasurable() {
    return this.measuredCosts.length > 0;
  }

  get isFreeMonthly() {
    return this.baseCost === 0;
  }

  renderBaseCost(): JSX.Element | null {
    if (typeof this.baseCost !== 'number') return null;
    // If there are measurable costs but no monthly cost, only show measurable
    if (this.isFreeMonthly && this.measuredCosts.length > 0) return null;

    if (this.isFreeMonthly) {
      // Show the badge for compact, large text otherwise
      return this.compact ? <manifold-badge>Free</manifold-badge> : 'Free';
    }
    // $5.00 / mo
    return this.compact ? $(this.baseCost) : [$(this.baseCost), <small>&nbsp;/&nbsp;mo</small>];
  }

  renderMeasurableCosts() {
    return this.measuredCosts.map(([cost, suffix], index) => {
      const shouldShowPlus = (index === 0 && !this.isFreeMonthly) || index > 0;
      return [
        shouldShowPlus ? <span>&nbsp;+&nbsp;</span> : '',
        $(cost),
        <small>&nbsp;/&nbsp;{suffix}</small>,
      ];
    });
  }

  render() {
    if (typeof this.baseCost !== 'number') return <div class="cost" />;

    return (
      <div class="cost" data-compact={this.compact}>
        <span itemprop="price">
          {this.compact && this.isCustomizable && !this.isMeasurable && (
            <span class="starting">Starting at</span>
          )}
          {this.renderBaseCost()}
          {this.renderMeasurableCosts()}
        </span>
      </div>
    );
  }
}
