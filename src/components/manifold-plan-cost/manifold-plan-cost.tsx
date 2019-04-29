import { Component, Element, Prop, State, Watch } from '@stencil/core';
import Tunnel from '../../data/connection';
import { Connection, connections } from '../../utils/connections';
import { planCost, hasCustomizableFeatures, initialFeatures } from '../../utils/plan';

@Component({ tag: 'manifold-plan-cost' })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  @Prop() connection: Connection = connections.prod;
  @Prop() allFeatures: Catalog.ExpandedFeature[] = [];
  @Prop() compact?: boolean = false;
  @Prop() customizable?: boolean = false;
  @Prop() planId: string;
  @Prop() selectedFeatures: Gateway.FeatureMap = {};
  @State() controller?: AbortController;
  @State() baseCost?: number;
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

  get isCustomizable() {
    if (!Array.isArray(this.allFeatures)) return false;
    return hasCustomizableFeatures(this.allFeatures);
  }

  measuredFeatures(features: Catalog.ExpandedFeature[]): Catalog.ExpandedFeature[] {
    return features
      .filter(({ measurable }) => measurable === true)
      .filter(({ value }) => {
        if (!value || !value.numeric_details || !value.numeric_details.cost_ranges) return false;
        return value.numeric_details.cost_ranges.find(
          ({ cost_multiple }) => typeof cost_multiple === 'number' && cost_multiple > 0
        );
      });
  }

  calculateCost() {
    const allFeatures = { ...initialFeatures(this.allFeatures), ...this.selectedFeatures };

    // Fetch base cost from cost API (and cancel in-flight reqs)
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
        measuredFeatures={this.measuredFeatures(this.allFeatures)}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
