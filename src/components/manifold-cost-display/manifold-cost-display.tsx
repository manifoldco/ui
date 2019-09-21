import { h, JSX, Component, Element, Prop } from '@stencil/core';

import { $ } from '../../utils/currency';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { PlanMeteredFeatureEdge } from '../../types/graphql';
import { meteredFeatureDisplayValue } from '../../utils/plan';

@Component({ tag: 'manifold-cost-display', styleUrl: 'manifold-cost-display.css', shadow: true })
export class ManifoldCostDisplay {
  @Element() el: HTMLElement;
  @Prop() baseCost?: number;
  @Prop() compact?: boolean = false;
  @Prop() meteredFeatures: PlanMeteredFeatureEdge[] = [];
  @Prop() startingAt?: boolean = false;

  get isFreeMonthly() {
    return this.baseCost === 0;
  }

  renderBaseCost(): JSX.Element | null {
    if (typeof this.baseCost !== 'number') {
      return null;
    }
    // If there are measurable costs but no monthly cost, only show measurable
    if (this.isFreeMonthly && this.meteredFeatures.length > 0) {
      return null;
    }

    if (this.isFreeMonthly) {
      // Show the badge for compact, large text otherwise
      return this.compact ? <manifold-badge data-tag="free">Free</manifold-badge> : 'Free';
    }
    // $5 / mo
    return this.compact ? $(this.baseCost) : [$(this.baseCost), <small>&nbsp;/&nbsp;mo</small>];
  }

  renderMeteredCosts() {
    if (this.meteredFeatures.length < 1) {
      return null;
    }

    if (this.meteredFeatures.length > 1) {
      return 'metered usage';
    }
    const displayString = meteredFeatureDisplayValue(this.meteredFeatures[0].node) || '';
    const output: (JSX.Element)[] = this.isFreeMonthly ? [] : [' + '];
    if (displayString.indexOf('per') > 0) {
      const [cost, suffix] = displayString.split(' per ');
      output.push(cost, <small>&nbsp;per&nbsp;{suffix}</small>);
    } else {
      const [cost, suffix] = displayString.split(' / ');
      output.push(cost, <small>&nbsp;/&nbsp;{suffix}</small>);
    }

    return output;
  }

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (typeof this.baseCost !== 'number') {
      return <div class="cost" />;
    }

    // Show “starting at” either if customizable, or too many metered features to display
    const startingAt = (this.compact && this.startingAt) || this.meteredFeatures.length > 1;

    return (
      <div class="cost" data-compact={this.compact}>
        <span itemprop="price">
          {startingAt && <span class="starting">Starting at</span>}
          {this.renderBaseCost()}
          {this.renderMeteredCosts()}
        </span>
      </div>
    );
  }
}
