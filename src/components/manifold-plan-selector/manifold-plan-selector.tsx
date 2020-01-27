import { h, Component, Element, State, Prop, Watch } from '@stencil/core';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { Product, Resource, PlanEdge } from '../../types/graphql';

import plansQuery from './plan-list.graphql';
import resourceQuery from './resource.graphql';

@Component({ tag: 'manifold-plan-selector' })
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  /** Show only free plans? */
  @Prop() freePlans?: boolean;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Specify regions visible */
  @Prop() regions?: string;
  /** Is this tied to an existing resource? */
  @Prop() resourceLabel?: string;
  @Prop() hideUntilReady?: boolean = false;
  @State() product?: Product;
  @State() plans?: PlanEdge[];
  @State() resource?: Resource;
  @State() parsedRegions: string[];
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchPlans(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }

  @loadMark()
  componentWillLoad(): Promise<void> | void {
    let call;

    if (this.resourceLabel) {
      call = this.fetchResource(this.resourceLabel);
    } else if (this.productLabel) {
      call = this.fetchPlans(this.productLabel);
    }

    if (this.hideUntilReady) {
      return call;
    }

    return undefined;
  }

  async fetchPlans(productLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    this.product = undefined;

    const { data } = await this.graphqlFetch({
      query: plansQuery,
      variables: {
        productLabel,
      },
      element: this.el,
    });

    if (data && data.product) {
      this.product = data.product;

      if (data.product.plans) {
        const plans = this.freePlans
          ? this.filterFreeOnly(data.product.plans.edges)
          : data.product.plans.edges;

        // TODO: Make GraphQL sort by free AND cost
        this.plans = [...plans].sort(a => (a.node.free ? -1 : 0));
      }
    }
  }

  async fetchResource(resourceLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    this.resource = undefined;

    const { data } = await this.graphqlFetch({
      query: resourceQuery,
      variables: {
        resourceLabel,
      },
      element: this.el,
    });

    if (data && data.resource) {
      this.resource = data.resource;
      if (data.resource && data.resource.plan && data.resource.plan.product) {
        // TODO move plan fetching to resource query
        this.fetchPlans(data.resource.plan.product.label);
      }
    }
  }

  filterFreeOnly(plans: PlanEdge[]) {
    return plans.filter(({ node: { free } }) => free);
  }

  @logger()
  render() {
    const regions =
      (this.regions && this.regions.split(',').map(region => region.trim())) || undefined;

    return (
      <manifold-active-plan
        selectedResource={this.resource}
        isExistingResource={!!this.resourceLabel}
        plans={this.plans}
        product={this.product}
        regions={regions}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}
