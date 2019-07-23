import { h, JSX, Component, Element, Prop } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import { $ } from '../../utils/currency';
import { numberFeatureMeasurableDisplayValue } from '../../utils/plan';

@Component({ tag: 'manifold-cost-display', styleUrl: 'manifold-cost-display.css', shadow: true })
export class ManifoldCostDisplay {
  @Element() el: HTMLElement;
  @Prop() baseCost?: number;
  @Prop() compact?: boolean = false;
  @Prop() isCustomizable?: boolean = false;
  @Prop() measuredFeatures: Catalog.ExpandedFeature[] = [];

  get isFreeMonthly() {
    return this.baseCost === 0;
  }

  renderBaseCost(): JSX.Element | null {
    if (typeof this.baseCost !== 'number') {
      return null;
    }
    // If there are measurable costs but no monthly cost, only show measurable
    if (this.isFreeMonthly && this.measuredFeatures.length > 0) {
      return null;
    }

    if (this.isFreeMonthly) {
      // Show the badge for compact, large text otherwise
      return this.compact ? <manifold-badge data-tag="free">Free</manifold-badge> : 'Free';
    }
    // $5 / mo
    return this.compact ? $(this.baseCost) : [$(this.baseCost), <small>&nbsp;/&nbsp;mo</small>];
  }

  renderMeasurableCosts() {
    if (this.measuredFeatures.length !== 1) {
      return null;
    }

    const [{ value }] = this.measuredFeatures;
    if (!value) {
      return null;
    }
    const displayString = numberFeatureMeasurableDisplayValue(value) || '';
    const output: (JSX.Element)[] = this.isFreeMonthly ? [] : [' + '];
    if (displayString.indexOf('per') > 0) {
      const [cost, suffix] = displayString.split(' per ');
      output.push(cost);
      output.push(<small>&nbsp;per&nbsp;{suffix}</small>);
    } else {
      const [cost, suffix] = displayString.split(' / ');
      output.push(cost);
      output.push(<small>&nbsp;/&nbsp;{suffix}</small>);
    }
    return output;
  }

  render() {
    if (typeof this.baseCost !== 'number') {
      return <div class="cost" />;
    }

    // Show “starting at” either if customizable, or too many metered features to display
    const startingAt = (this.compact && this.isCustomizable) || this.measuredFeatures.length > 1;

    return (
      <div class="cost" data-compact={this.compact}>
        <span itemprop="price">
          {startingAt && <span class="starting">Starting at</span>}
          {this.renderBaseCost()}
          {this.renderMeasurableCosts()}
        </span>
      </div>
    );
  }
}
