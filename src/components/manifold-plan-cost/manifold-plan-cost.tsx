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
  @Prop() allFeatures: Catalog.ExpandedFeature[];
  @Prop() compact?: boolean = false;
  @Prop() customizable?: boolean = false;
  @Prop() planId: string;
  @Prop() selectedFeatures: UserFeatures = {};
  @State() controller?: AbortController;
  @State() baseCost: number;
  @State() measuredCost: number;
  @State() suffix?: string;
  @Watch('allFeatures') allFeaturesChanged() {
    if (Object.keys(this.allFeatures)) {
      this.selectedFeatures = {
        ...initialFeatures(this.allFeatures),
        ...this.selectedFeatures,
      };
    }
    this.calculateCost();
  }
  @Watch('planId') planChanged() {
    this.calculateCost();
  }
  @Watch('selectedFeatures') selectedFeaturesChanged() {
    this.calculateCost();
  }

  componentWillLoad() {
    return this.calculateCost();
  }

  // Note: isCustomizable & isMeasurable are not mutually exclusive; a plan may be both
  get isCustomizable() {
    if (!Array.isArray(this.allFeatures)) return false;
    return hasCustomizableFeatures(this.allFeatures);
  }

  get isMeasurable() {
    if (!Array.isArray(this.allFeatures)) return false;
    return hasMeasurableFeatures(this.allFeatures);
  }

  get customizableFeatures() {
    return this.allFeatures.filter(
      ({ customizable }) => typeof customizable === 'boolean' && customizable
    );
  }

  get measurableFeatures() {
    return this.allFeatures.filter(
      ({ measurable }) => typeof measurable === 'boolean' && measurable
    );
  }

  calculateCost() {
    if (!this.planId) return Promise.resolve();

    // 1. Calculate metered pricing, if any
    if (this.isMeasurable) {
      const firstFeature = this.measurableFeatures[0];
      if (firstFeature && firstFeature.value) {
        this.suffix =
          firstFeature.value.numeric_details && firstFeature.value.numeric_details.suffix;
        this.measuredCost = pricingTiers(firstFeature.value)[0].cost;
      }
    }

    if (!Object.keys(this.selectedFeatures) && Array.isArray(this.allFeatures)) {
      this.selectedFeatures = initialFeatures(this.allFeatures);
    }

    // 2. Fetch base cost from cost API (and cancel in-flight reqs)
    if (this.controller) this.controller.abort(); // If a request is in flight, cancel it
    this.controller = new AbortController();

    return planCost(this.connection, {
      planID: this.planId,
      features: this.selectedFeatures,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.baseCost = cost || 0;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  renderBaseCost(): JSX.Element {
    if (this.baseCost > 0 && this.measuredCost > 0) {
      return `${$(this.baseCost)} + {${$(this.measuredCost)}`;
    }
    if (this.baseCost === 0 && this.measuredCost > 0) {
      return $(this.measuredCost);
    }
    if (this.baseCost === 0 && this.measuredCost === 0) {
      return this.compact ? <mf-badge>Free</mf-badge> : 'Free';
    }
    return $(this.baseCost);
  }

  renderSuffix() {
    if (this.measuredCost > 0) {
      return <small>&nbsp;/&nbsp;{this.suffix || 'unit'}</small>;
    }
    if (this.baseCost > 0) {
      return <small>&nbsp;/&nbsp;mo</small>;
    }
    return null;
  }

  render() {
    return (
      <div class="cost" itemprop="price" data-compact={this.compact}>
        {(this.isMeasurable || this.isCustomizable) && <span class="starting">Starting at</span>}
        <span itemprop="price">{this.renderBaseCost()}</span>
        {this.renderSuffix()}
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
