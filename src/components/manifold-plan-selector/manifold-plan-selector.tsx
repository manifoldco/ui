import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import planData from '../../data/plan-details-query';
import { Product, Resource } from '../../types/graphql';

const plansQuery = gql`
  query PLAN_LIST($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      label
      logoUrl
      plans(first: 25, orderBy: { field: COST, direction: ASC }) {
        edges {
          node ${planData}
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
      freePlans(first: 25) {
        edges {
          node ${planData}
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
  @State() resource?: Resource;
  @State() parsedRegions: string[];
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchPlans(newProduct);
  }
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResource(newResource);
  }
  @Watch('regions') regionsChange(newRegions: string) {
    if (newRegions) {
      this.parsedRegions = this.parseRegions(newRegions);
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

    this.product = undefined;

    const { data } = await this.graphqlFetch({
      query: this.freePlans ? freePlansQuery : plansQuery,
      variables: {
        productLabel,
      },
    });

    if (data && data.product) {
      this.product = data.product;
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
    });

    if (data && data.resource) {
      this.resource = data.resource;
      if (data.resource && data.resource.plan && data.resource.plan.product) {
        this.fetchPlans(data.resource.plan.product.label);
      }
    }
  }

  parseRegions(regions: string) {
    return regions.split(',').map(region => region.trim().toLowerCase());
  }

  @logger()
  render() {
    return (
      <manifold-active-plan
        plans={(this.product && this.product.plans && this.product.plans.edges) || []}
        product={this.product}
        regions={this.parsedRegions}
        selectedResource={this.resource}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}
