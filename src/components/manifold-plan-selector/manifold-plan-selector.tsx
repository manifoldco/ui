import { h, Component, Element, State, Prop, Watch } from '@stencil/core';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { PlansQuery, ResourcePlansQuery } from '../../types/graphql';
import plansQuery from './plans.graphql';
import resourcePlansQuery from './resource-plans.graphql';

@Component({ tag: 'manifold-plan-selector' })
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  /** Show only free plans? */
  @Prop() freePlans?: boolean;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Is this tied to an existing resource? */
  @Prop() resourceLabel?: string;
  /** Specify regions visible */
  @Prop() regions?: string;
  @Prop() hideUntilReady?: boolean = false;
  @State() product?: PlansQuery['product'];
  @State() plans?: PlansQuery['product']['paidPlans']['edges'];
  @State() parsedRegions: string[];
  @State() resource?: ResourcePlansQuery['resource'];
  @Watch('productLabel') productChange(newProduct: string) {
    if (newProduct) {
      this.fetchPlans(newProduct);
    }
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    if (newResource) {
      this.fetchResource(newResource);
    }
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

    const { data } = await this.graphqlFetch<PlansQuery>({
      query: plansQuery,
      variables: { productLabel },
      element: this.el,
    });

    if (data) {
      this.product = data.product;
      this.plans = this.filterConfigurablePlans({
        ...data.product.freePlans.edges,
        ...data.product.paidPlans.edges,
      });
    }
  }

  async fetchResource(resourceLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch<ResourcePlansQuery>({
      query: resourcePlansQuery,
      variables: { resourceLabel },
      element: this.el,
    });

    if (data) {
      this.resource = data.resource;
      this.plans = this.filterConfigurablePlans({
        ...data.resource.plan.product.freePlans.edges,
        ...data.resource.plan.product.paidPlans.edges,
      });
    }
  }

  // TODO: delete this filter when GraphQL supports configurable plans
  filterConfigurablePlans(plans: PlansQuery['product']['paidPlans']['edges']) {
    return plans.filter(
      ({ node: { configurableFeatures } }) =>
        !configurableFeatures || configurableFeatures.edges.length === 0
    );
  }

  @logger()
  render() {
    const regions =
      (this.regions && this.regions.split(',').map(region => region.trim())) || undefined;

    return (
      <manifold-active-plan plans={this.plans} product={this.product} regions={regions}>
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}
