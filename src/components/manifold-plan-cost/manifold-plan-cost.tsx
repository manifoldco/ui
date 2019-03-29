import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { $ } from '../../utils/currency';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import {
  planCost,
  hasMeasurableFeatures,
  hasCustomizableFeatures,
  pricingTiers,
  initialFeatures,
} from '../../utils/plan';

@Component({ tag: 'manifold-plan-cost', styleUrl: 'manifold-plan-cost.css', shadow: true })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  @Prop() connection: Connection;
  @Prop() features: Catalog.ExpandedFeature[];
  @Prop() compact?: boolean = false;
  @Prop() customizable?: boolean = false;
  @Prop() planId: string;
  @Prop() selectedFeatures: UserFeatures = {};
  @State() controller?: AbortController;
  @State() baseCost?: number;
  @State() measuredCosts: [number, string][] = [];
  @Watch('features') featuresChanged() {
    this.calculateCost();
  }
  @Watch('planId') planChanged() {
    this.calculateCost();
  }

  componentWillLoad() {
    return this.calculateCost();
  }

  setDefaultFeatures(features: Catalog.ExpandedFeature[] = this.features) {
    if (!Array.isArray(features)) return;
    this.selectedFeatures = { ...initialFeatures(features) };
    this.calculateCost();
  }

  // Note: isCustomizable & isMeasurable are not mutually exclusive; a plan may be both
  get isCustomizable() {
    if (!Array.isArray(this.features)) return false;
    return hasCustomizableFeatures(this.features);
  }

  get isMeasurable() {
    if (!Array.isArray(this.features)) return false;
    return hasMeasurableFeatures(this.features);
  }

  calculateCost() {
    const allFeatures = { ...initialFeatures(this.features), ...this.selectedFeatures };

    // 1. Calculate metered pricing, if any
    if (this.isMeasurable) {
      const measurableFeatures = this.features.filter(({ measurable }) => !!measurable);
      this.measuredCosts = measurableFeatures.reduce((allCosts, { value }): [number, string][] => {
        if (!value || !value.numeric_details) return allCosts;
        return [
          ...allCosts,
          [pricingTiers(value)[0].cost || 0, value.numeric_details.suffix || ''],
        ];
      }, []);
    }

    // 2. Fetch base cost from cost API (and cancel in-flight reqs)
    if (!this.planId) return Promise.resolve();
    // Hide display while calculating
    this.baseCost = undefined;
    if (this.controller) this.controller.abort(); // If a request is in flight, cancel it
    this.controller = new AbortController();

    return planCost(this.connection, {
      planID: this.planId,
      features: allFeatures,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.baseCost = cost || 0;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  renderBaseCost(): JSX.Element | null {
    if (typeof this.baseCost !== 'number') return null;
    // If there are measurable costs but no monthly cost, only show measurable
    if (this.baseCost === 0 && this.measuredCosts.length > 0) return null;

    if (this.baseCost === 0) {
      // Show the badge for compact, large text otherwise
      return this.compact ? <manifold-badge>Free</manifold-badge> : 'Free';
    }
    // $5.00 / mo
    return this.compact ? $(this.baseCost) : [$(this.baseCost), <small>&nbsp;/&nbsp;mo</small>];
  }

  renderMeasurableCosts() {
    return this.measuredCosts.map(([cost, suffix], index) => {
      const shouldShowPlus = (index === 0 && this.baseCost > 0) || index > 0;
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
      <div class="cost" itemprop="price" data-compact={this.compact}>
        {this.compact && this.isCustomizable && !this.isMeasurable && (
          <span class="starting">Starting at</span>
        )}
        <span itemprop="price">{this.renderBaseCost()}</span>
        <span itemprop="price">{this.renderMeasurableCosts()}</span>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
