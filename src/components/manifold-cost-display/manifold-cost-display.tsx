import { h, Component, Element, Prop, FunctionalComponent } from '@stencil/core';

import { $ } from '../../utils/currency';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { PlanMeteredFeatureEdge } from '../../types/graphql';
import { meteredFeatureDisplayValue } from '../../utils/plan';

/**
 * Base Cost
 */
interface BaseCostProps {
  cost: number;
  isFreeMonthly?: boolean;
  hasMeteredFeatures?: boolean;
  compact?: boolean;
}
const BaseCost: FunctionalComponent<BaseCostProps> = props => {
  const { cost, isFreeMonthly, hasMeteredFeatures, compact } = props;

  if (typeof cost !== 'number') {
    return null;
  }
  // If there are measurable costs but no monthly cost, only show measurable
  if (isFreeMonthly && hasMeteredFeatures) {
    return null;
  }

  if (isFreeMonthly) {
    // Show the badge for compact, large text otherwise
    return compact ? <manifold-badge data-tag="free">Free</manifold-badge> : 'Free';
  }
  // $5 / mo
  return compact ? $(cost) : [$(cost), <small>&nbsp;/&nbsp;mo</small>];
};

/**
 * Metered Cost
 */
interface MeteredCostProps {
  meteredFeatures: PlanMeteredFeatureEdge[];
}
const MeteredCost: FunctionalComponent<MeteredCostProps> = ({ meteredFeatures }) => {
  if (meteredFeatures.length === 0) {
    return null;
  }

  if (meteredFeatures.length > 1) {
    return <small>metered usage</small>;
  }

  const displayValue = meteredFeatureDisplayValue(meteredFeatures[0].node.numericDetails);

  return [displayValue.cost, displayValue.per ? <small>&nbsp;{displayValue.per}</small> : ''];
};

/**
 * Cost Display
 */
@Component({ tag: 'manifold-cost-display', styleUrl: 'manifold-cost-display.css', shadow: true })
export class ManifoldCostDisplay {
  @Element() el: HTMLElement;
  @Prop() baseCost?: number;
  @Prop() compact?: boolean = false;
  @Prop() meteredFeatures: PlanMeteredFeatureEdge[] = [];
  @Prop() configurable?: boolean = false;

  get isFreeMonthly() {
    return this.baseCost === 0;
  }

  get hasMeteredFeatures() {
    return this.meteredFeatures.length > 0;
  }

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    if (typeof this.baseCost !== 'number') {
      return <div class="cost" />;
    }

    // Show “starting at” if customizable
    const startingAt = this.compact && this.configurable;

    // Show plus sign if metered features
    const compositeCost = !this.isFreeMonthly && this.hasMeteredFeatures;

    return (
      <div class="cost" data-compact={this.compact}>
        <span itemprop="price">
          {startingAt && <span class="starting">Starting at</span>}
          <BaseCost
            compact={this.compact}
            cost={this.baseCost}
            isFreeMonthly={this.isFreeMonthly}
            hasMeteredFeatures={this.hasMeteredFeatures}
          />
          {compositeCost && ' + '}
          <MeteredCost meteredFeatures={this.meteredFeatures} />
        </span>
      </div>
    );
  }
}
