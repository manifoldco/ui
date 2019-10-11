import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { Plan } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import planData from '../../data/plan-details-query';

const planQuery = gql`
  query PRODUCT_AND_PLAN($planId: ID!) {
    plan(id: $planId) {
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
  @Prop() hideUntilReady?: boolean = false;
  @Prop() planId?: string;
  @State() plan?: Plan;
  @Watch('planId') planChange(newPlan: string) {
    this.fetchPlan(newPlan);
  }

  @loadMark()
  componentWillLoad() {
    let call;

    if (this.planId) {
      call = this.fetchPlan(this.planId);
    }

    if (this.hideUntilReady) {
      return call;
    }

    return undefined;
  }

  async fetchPlan(planId: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query: planQuery,
      variables: {
        planId,
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
