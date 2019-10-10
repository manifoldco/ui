import { h, Component, Element, Prop, State, Watch } from '@stencil/core';

import { Gateway } from '../../types/gateway';
import connection from '../../state/connection';
import { planCost, configurableFeatureDefaults } from '../../utils/plan';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Plan } from '../../types/graphql';

@Component({ tag: 'manifold-plan-cost' })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
  @Prop() plan?: Plan;
  /** Compact mode (for plan selector sidebar) */
  @Prop() compact?: boolean = false;
  /** User-selected plan features (needed only for customizable) */
  @Prop() selectedFeatures?: Gateway.FeatureMap;
  @State() calculatedCost?: number;
  @State() controller?: AbortController;
  @Watch('plan') planChange() {
    this.fetchCustomCost();
  }
  @Watch('selectedFeatures') selectedFeaturesChanged(newFeatures: Gateway.FeatureMap) {
    this.fetchCustomCost(newFeatures);
  }

  @loadMark()
  componentWillLoad() {
    return this.fetchCustomCost(); // If we’re calculating custom features, wait to render until call finishes
  }

  async fetchCustomCost(selectedFeatures = this.selectedFeatures) {
    if (!this.restFetch || !this.plan) {
      return undefined;
    }

    // if not configurable, return plan cost
    if (!this.plan.configurableFeatures || !this.plan.configurableFeatures.edges.length) {
      this.calculatedCost = this.plan.cost;
      return undefined;
    }

    // Hide display while calculating
    this.calculatedCost = undefined;
    if (this.controller) {
      this.controller.abort();
    } // If a request is in flight, cancel it
    this.controller = new AbortController();

    const features =
      selectedFeatures || configurableFeatureDefaults(this.plan.configurableFeatures.edges);

    // Returning the promise is necessary for componentWillLoad()
    return planCost(this.restFetch, {
      planID: this.plan.id,
      features,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.calculatedCost = cost || 0;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  @logger()
  render() {
    return (
      <manifold-cost-display
        baseCost={this.calculatedCost}
        compact={this.compact}
        meteredFeatures={
          (this.plan && this.plan.meteredFeatures && this.plan.meteredFeatures.edges) || undefined
        }
        configurable={
          (this.plan &&
            this.plan.configurableFeatures &&
            this.plan.configurableFeatures.edges.length > 0) ||
          false
        }
      />
    );
  }
}
