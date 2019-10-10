import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { Plan } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import planData from '../../data/plan-details-query';

const planQuery = gql`
  query PRODUCT_AND_PLAN($planLabel: String!) {
    plan(label: $planLabel) {
      ${planData}
      product {
        id
        displayName
        label
        logoUrl
      }
    }
  }
`;

@Component({ tag: 'manifold-plan' })
export class ManifoldPlan {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"kitefin"`) */
  @Prop() planLabel?: string;
  @State() plan?: Plan;
  @Watch('planLabel') planChange(newPlan: string) {
    this.fetchPlan(newPlan);
  }

  @loadMark()
  @loadMark()
  componentWillLoad() {
    if (this.planLabel) {
      this.fetchPlan(this.planLabel);
    }
  }

  async fetchPlan(planLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query: planQuery,
      variables: {
        planLabel,
      },
    });

    if (data && data.plan) {
      this.plan = data.plan;
    }
  }

  @logger()
  render() {
    return (
      <manifold-plan-details
        scrollLocked={false}
        plan={this.plan}
        product={(this.plan && this.plan.product) || undefined}
      />
    );
  }
}
