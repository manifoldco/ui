import { Component, Element, Prop, State, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { Connection, connections } from '../../utils/connections';
import {
  planCost,
  hasMeasurableFeatures,
  hasCustomizableFeatures,
  pricingTiers,
  initialFeatures,
} from '../../utils/plan';

@Component({ tag: 'manifold-plan-cost' })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  @Prop() connection: Connection = connections.prod;
  @Prop() allFeatures: Catalog.ExpandedFeature[] = [];
  @Prop() compact?: boolean = false;
  @Prop() customizable?: boolean = false;
  @Prop() planId: string;
  @Prop() selectedFeatures: UserFeatures = {};
  @State() controller?: AbortController;
  @State() baseCost?: number;
  @State() measuredCosts: [number, string][] = [];
  @Watch('allFeatures') featuresChanged() {
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

  calculateCost() {
    const allFeatures = { ...initialFeatures(this.allFeatures), ...this.selectedFeatures };

    // 1. Calculate metered pricing, if any
    if (this.isMeasurable) {
      const measurableFeatures = this.allFeatures.filter(({ measurable }) => !!measurable);
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

    // Returning the promise is necessary for componentWillLoad()
    return planCost(this.connection, {
      planID: this.planId,
      features: allFeatures,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.baseCost = cost || 0;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  render() {
    return (
      <manifold-cost-display
        baseCost={this.baseCost}
        compact={this.compact}
        isCustomizable={this.isCustomizable}
        measuredCosts={this.measuredCosts}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
