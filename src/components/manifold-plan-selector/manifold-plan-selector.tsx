import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { Product, PlanConnection } from '../../types/graphql';

const query = gql`
  query PLAN_LIST($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      label
      logoUrl
      plans(first: 500, orderBy: { field: COST, direction: ASC }) {
        edges {
          node {
            id
            displayName
            label
            free
            cost
            fixedFeatures(first: 500) {
              edges {
                node {
                  label
                  displayName
                  displayValue
                }
              }
            }
            meteredFeatures(first: 500) {
              edges {
                node {
                  label
                  displayName
                  numericDetails {
                    unit
                    costTiers {
                      limit
                      cost
                    }
                  }
                }
              }
            }
            configurableFeatures(first: 500) {
              edges {
                node {
                  label
                  displayName
                  type
                  options {
                    displayName
                    displayValue
                  }
                  numericDetails {
                    increment
                    min
                    max
                    unit
                    costTiers {
                      limit
                      cost
                    }
                  }
                }
              }
            }
            regions(first: 500) {
              edges {
                node {
                  id
                  displayName
                  platform
                  dataCenter
                }
              }
            }
          }
        }
      }
    }
  }
`;

const filterFreePlans = (product: Product): Product => {
  const freePlans: PlanConnection = {
    ...(product.plans as PlanConnection),
    edges: product.plans ? product.plans.edges.filter(plan => plan.node.free) : [],
  };

  return {
    ...product,
    plans: freePlans,
  };
};

@Component({ tag: 'manifold-plan-selector' })
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  /** Show only free plans? */
  @Prop() freePlans?: boolean;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** Specify region order */
  @Prop() regions?: string;
  @Prop() hideUntilReady?: boolean = false;
  @State() product?: Product;
  @State() parsedRegions: string[];
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProductByLabel(newProduct);
  }
  @Watch('regions') regionsChange(newRegions: string) {
    if (newRegions) {
      this.parsedRegions = this.parseRegions(newRegions);
    }
  }

  @loadMark()
  componentWillLoad(): Promise<void> | void {
    let call;

    if (this.productLabel) {
      call = this.fetchProductByLabel(this.productLabel);
    }

    if (this.hideUntilReady) {
      return call;
    }

    return undefined;
  }

  async fetchProductByLabel(productLabel: string) {
    if (!this.graphqlFetch) {
      return;
    }

    const { data } = await this.graphqlFetch({
      query,
      variables: { productLabel },
    });

    if (data && data.product) {
      this.product = this.freePlans ? filterFreePlans(data.product) : data.product;
    }
  }

  // async fetchPlans(productId: string) {
  //   if (!this.restFetch) {
  //     return;
  //   }

  //   this.plans = undefined;

  //   const response = await this.restFetch<Catalog.ExpandedPlan[]>({
  //     service: 'catalog',
  //     endpoint: `/plans/?product_id=${productId}`,
  //   });

  //   if (response) {
  //     this.plans = planSort(response, { free: this.freePlans });
  //   }
  // }

  // async fetchResource(resourceLabel: string) {
  //   if (!this.restFetch) {
  //     return;
  //   }

  //   this.resource = undefined;

  //   const response = await this.restFetch<Marketplace.Resource[]>({
  //     service: 'marketplace',
  //     endpoint: `/resources/?me&label=${resourceLabel}`,
  //   });

  //   if (response && response.length) {
  //     const resource = response[0];
  //     if (!resource.body.product_id) {
  //       console.error('No resource found');
  //       return;
  //     }

  //     await this.fetchPlans(resource.body.product_id);
  //   }
  // }

  parseRegions(regions: string) {
    return regions.split(',').map(region => region.trim().toLowerCase());
  }

  @logger()
  render() {
    return (
      <manifold-active-plan
        plans={(this.product && this.product.plans) || undefined}
        product={this.product}
        regions={this.parsedRegions}
      >
        <manifold-forward-slot slot="cta">
          <slot name="cta" />
        </manifold-forward-slot>
      </manifold-active-plan>
    );
  }
}
