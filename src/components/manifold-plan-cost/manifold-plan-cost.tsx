import { h, Component, Element, Prop, State, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { planCost, hasCustomizableFeatures, initialFeatures } from '../../utils/plan';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-plan-cost' })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** All plan features */
  @Prop() allFeatures: Catalog.ExpandedFeature[] = [];
  /** Compact mode (for plan selector sidebar) */
  @Prop() compact?: boolean = false;
  /** Plan default cost */
  @Prop({ mutable: true }) defaultCost?: number = 0;
  /** Plan ID */
  @Prop() planId?: string;
  /** User-selected plan features (needed only for customizable) */
  @Prop() selectedFeatures?: Gateway.FeatureMap = {};
  @State() controller?: AbortController;
  @Watch('allFeatures') featuresChanged() {
    this.fetchCustomCost();
  }
  @Watch('selectedFeatures') selectedFeaturesChanged() {
    this.fetchCustomCost();
  }

  componentWillLoad() {
    return this.fetchCustomCost(); // If we’re calculating custom features, wait to render until call finishes
  }

  get isCustomizable() {
    return hasCustomizableFeatures(this.allFeatures);
  }

  measuredFeatures(features: Catalog.ExpandedFeature[]): Catalog.ExpandedFeature[] {
    return features
      .filter(({ measurable }) => measurable === true)
      .filter(({ value }) => {
        if (!value || !value.numeric_details || !value.numeric_details.cost_ranges) {
          return false;
        }
        return value.numeric_details.cost_ranges.find(
          ({ cost_multiple }) => typeof cost_multiple === 'number' && cost_multiple > 0
        );
      });
  }

  fetchCustomCost() {
    if (!this.restFetch) {
      return null;
    }

    // If this doesn’t have customizable features, then don’t call the API
    if (!this.isCustomizable) {
      return null;
    }

    const allFeatures = { ...initialFeatures(this.allFeatures), ...this.selectedFeatures };

    // Fetch base cost from cost API (and cancel in-flight reqs)
    if (!this.planId) {
      return Promise.resolve();
    }
    // Hide display while calculating
    this.defaultCost = undefined;
    if (this.controller) {
      this.controller.abort();
    } // If a request is in flight, cancel it
    this.controller = new AbortController();

    // Returning the promise is necessary for componentWillLoad()
    return planCost(this.restFetch, {
      planID: this.planId,
      features: allFeatures,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.defaultCost = cost || 0;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  @logger()
  render() {
    return (
      <manifold-cost-display
        baseCost={this.defaultCost}
        compact={this.compact}
        measuredFeatures={this.measuredFeatures(this.allFeatures)}
        startingAt={this.isCustomizable && this.compact}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['restFetch']);
