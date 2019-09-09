import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import { Product } from '../../types/graphql';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import logger from '../../utils/logger';

const query = gql`
  query PRODUCT($productLabel: String!) {
    product(label: $productLabel) {
      id
      displayName
      label
      logoUrl
    }
  }
`;

@Component({ tag: 'manifold-plan' })
export class ManifoldPlan {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** URL-friendly slug (e.g. `"kitefin"`) */
  @Prop() planLabel?: string;
  @State() product?: Product;
  @State() plan?: Catalog.Plan;
  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProductAndPlan(newProduct, this.planLabel);
  }
  @Watch('planLabel') planChange(newPlan: string) {
    this.fetchProductAndPlan(this.productLabel, newPlan);
  }

  componentWillLoad() {
    this.fetchProductAndPlan(this.productLabel, this.planLabel);
  }

  async fetchProductAndPlan(productLabel?: string, planLabel?: string) {
    if (!productLabel || !planLabel || !this.restFetch || !this.graphqlFetch) {
      return;
    }

    this.product = undefined;
    const { data } = await this.graphqlFetch({
      query,
      variables: { productLabel },
    });

    if (data && data.product) {
      this.product = data.product;
      await this.fetchPlan(data.product.id, planLabel);
    }
  }

  async fetchPlan(productId: string, planLabel: string) {
    if (!this.restFetch) {
      return;
    }

    this.plan = undefined;
    const response = await this.restFetch<Catalog.ExpandedPlan[]>({
      service: 'catalog',
      endpoint: `/plans/?product_id=${productId}&label=${planLabel}`,
    });

    if (response) {
      this.plan = response[0]; // eslint-disable-line prefer-destructuring
    }
  }

  @logger()
  render() {
    return <manifold-plan-details scrollLocked={false} plan={this.plan} product={this.product} />;
  }
}

Tunnel.injectProps(ManifoldPlan, ['graphqlFetch', 'restFetch']);
