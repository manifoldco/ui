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
  @State() measuredCost: number = 0;
  @State() suffix?: string;
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
      const setFeature = this.features.find(
        ({ label, measurable }) => !!measurable && Object.keys(allFeatures).includes(label)
      );
      if (setFeature && setFeature.value) {
        this.suffix = setFeature.value.numeric_details && setFeature.value.numeric_details.suffix;
        this.measuredCost = pricingTiers(setFeature.value)[0].cost;
      }
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

  renderPrefix() {
    if (!this.compact) return null;
    if (this.isCustomizable) return <span class="starting">Starting at</span>;
    return null;
  }

  renderBaseCost(): JSX.Element | null {
    if (typeof this.baseCost !== 'number') return null;

    const monthlySuffix = <small>&nbsp;/&nbsp;mo</small>;
    const measurableSuffix = <small>&nbsp;/&nbsp;{this.suffix}</small>;

    // $5.00 / mo + $0.25 / hour
    if (this.baseCost > 0 && this.measuredCost > 0) {
      return [$(this.baseCost), monthlySuffix, ' + ', $(this.measuredCost), measurableSuffix];
    }
    // $0.25 / hour
    if (this.baseCost === 0 && this.measuredCost > 0) {
      return [$(this.measuredCost), measurableSuffix];
    }
    // Free
    if (this.baseCost === 0 && this.measuredCost === 0) {
      return this.compact ? <manifold-badge>Free</manifold-badge> : 'Free';
    }
    // $5.00 / mo
    return $(this.baseCost);
  }

  renderSuffix() {}

  render() {
    if (typeof this.baseCost !== 'number') return <div class="cost" />;

    return (
      <div class="cost" itemprop="price" data-compact={this.compact}>
        {this.renderPrefix()}
        <span itemprop="price">{this.renderBaseCost()}</span>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
