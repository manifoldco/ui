import { h, Component, Element, Prop, State, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Gateway } from '../../types/gateway';
import connection from '../../state/connection';
import { initialGqlFeatures, planCost } from '../../utils/plan';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { Plan } from '../../types/graphql';

const planQuery = gql`
  query PLAN_FEATURES($planId: ID!) {
    plan(id: $planId) {
      meteredFeatures(first: 50) {
        edges {
          node {
            label
            displayName
            displayValue
            numericDetails {
              min
              max
              unit
              costTiers {
                cost
                limit
              }
            }
          }
        }
      }
      configurableFeatures(first: 50) {
        edges {
          node {
            label
            displayName
            displayValue
            options {
              label
              displayName
              displayValue
            }
            numericDetails {
              min
              max
              unit
              costTiers {
                cost
                limit
              }
            }
          }
        }
      }
    }
  }
`;

@Component({ tag: 'manifold-plan-cost' })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
  /** TEMPORARY: Plan ID */
  @Prop() planId?: string;
  /** Compact mode (for plan selector sidebar) */
  @Prop() compact?: boolean = false;
  /** Plan default cost */
  @Prop({ mutable: true }) defaultCost?: number = 0;
  /** User-selected plan features (needed only for customizable) */
  @Prop() selectedFeatures?: Gateway.FeatureMap = undefined;
  @State() controller?: AbortController;
  @State() plan?: Plan;
  @Watch('allFeatures') featuresChanged() {
    this.fetchCustomCost();
  }
  @Watch('selectedFeatures') selectedFeaturesChanged() {
    this.fetchCustomCost();
  }

  @loadMark()
  componentWillLoad() {
    return this.fetchCustomCost(); // If we’re calculating custom features, wait to render until call finishes
  }

  async fetchCustomCost() {
    if (!this.restFetch || !this.graphqlFetch || !this.planId) {
      return null;
    }

    // TODO: remove this and pass plan as a whole prop
    if (!this.plan) {
      const { data } = await this.graphqlFetch({
        query: planQuery,
        variables: {
          planId: this.planId,
        },
      });

      if (data && data.plan) {
        this.plan = data.plan;
      }

      return null; // if couldn’t fetch plan, return
    }
    // TODO: end remove this

    // Only call the API with configurableFeatures
    if (!this.plan.configurableFeatures || this.plan.configurableFeatures.edges.length < 1) {
      return null;
    }

    const allFeatures = {
      ...initialGqlFeatures(this.plan.configurableFeatures.edges),
      ...this.selectedFeatures,
    };

    // Hide display while calculating
    this.defaultCost = undefined;
    if (this.controller) {
      this.controller.abort();
    } // If a request is in flight, cancel it
    this.controller = new AbortController();

    // Returning the promise is necessary for componentWillLoad()
    return planCost(this.restFetch, {
      planID: this.plan.id,
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
        baseCost={(this.plan && this.plan.cost) || this.defaultCost}
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
