import { h, Component, Element, State, Prop, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import planData from '../../data/plan-details-query';
import { Product, Resource, PlanEdge } from '../../types/graphql';

const plansQuery = gql`
  query PLAN_LIST($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      label
      logoUrl
      plans(first: 25, orderBy: { field: COST, direction: ASC }) {
        edges {
          node {
            ${planData}
          }
        }
      }
    }
  }
`;

const freePlansQuery = gql`
  query FREE_PLAN_LIST($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      label
      logoUrl
      plans(first: 25, free: true, orderBy: { field: COST, direction: ASC }) {
        edges {
          node {
            ${planData}
          }
        }
      }
    }
  }
`;

const resourceQuery = gql`
  query RESOURCE_PRODUCT($resourceLabel: String!) {
    resource(label: $resourceLabel) {
      plan {
        id
        product {
          label
        }
      }
    }
  }
`;

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
      query: this.freePlans ? freePlansQuery : plansQuery,
      variables: {
        productLabel,
      },
      element: this.el,
    });

    if (data && data.product) {
      this.product = data.product;

      if (data.product.plans) {
        // if plan is free then move to front (needed because GQL only sorts base cost not truly free plans)
        const freePlansFirst = [...data.product.plans.edges].sort(a => {
          if (a.node.free) {
            return -1;
          }
          return 0;
        });

        // TODO: re-add configurable plans when GraphQL supports resource features
        const TEMP_HIDE_CONFIGURABLE_PLANS = freePlansFirst.filter(
          ({ node: { configurableFeatures } }) =>
            !configurableFeatures || configurableFeatures.edges.length === 0
        );
        this.plans = TEMP_HIDE_CONFIGURABLE_PLANS;
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
        this.fetchPlans(data.resource.plan.product.label);
      }
    }
  }

  @logger()
  render() {
    const regions =
      (this.regions && this.regions.split(',').map(region => region.trim())) || undefined;

    return (
      <manifold-active-plan
        plans={this.plans}
        product={this.product}
        regions={regions}
        selectedResource={this.resource}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}
