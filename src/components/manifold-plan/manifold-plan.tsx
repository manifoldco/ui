import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import connection from '../../state/connection';
import { Product, Plan } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

const query = gql`
  query PRODUCT($productLabel: String!, $planLabel: String!) {
    product(label: $productLabel) {
      displayName
      label
      logoUrl
      plans(first: 1, label: $planLabel) {
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
            regions(first: 50) {
              edges {
                node {
                  id
                  displayName
                }
              }
            }
          }
        }
      }
    }
  }
`;

@Component({ tag: 'manifold-plan' })
export class ManifoldPlan {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** URL-friendly slug (e.g. `"kitefin"`) */
  @Prop() planLabel?: string;
  @State() product?: Product;
  @State() plan?: Plan;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProduct(newProduct, this.planLabel);
  }
  @Watch('planLabel') planChange(newPlan: string) {
    this.fetchProduct(this.productLabel, newPlan);
  }

  @loadMark()
  componentWillLoad() {
    this.fetchProduct(this.productLabel, this.planLabel);
  }

  async fetchProduct(productLabel?: string, planLabel?: string) {
    if (!productLabel || !planLabel || !this.graphqlFetch) {
      return;
    }

    this.product = undefined;
    const { data } = await this.graphqlFetch({
      query,
      variables: { productLabel, planLabel },
    });

    if (data && data.product) {
      this.product = data.product;
      if (data.product.plans) {
        this.plan = data.product.plans.edges[0].node;
      }
    }
  }

  @logger()
  render() {
    return <manifold-plan-details product={this.product} plan={this.plan} />;
  }
}
