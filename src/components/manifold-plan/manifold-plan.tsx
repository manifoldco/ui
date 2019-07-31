import { h, Component, State, Prop, Element, Watch } from '@stencil/core';

import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';

@Component({ tag: 'manifold-plan' })
export class ManifoldPlan {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel?: string;
  /** URL-friendly slug (e.g. `"kitefin"`) */
  @Prop() planLabel?: string;
  @State() product?: Catalog.Product;
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
    if (!productLabel || !planLabel || !this.restFetch) {
      return;
    }

    this.product = undefined;
    const response = await this.restFetch<Catalog.ExpandedProduct[]>({
      service: 'catalog',
      endpoint: `/products/?label=${productLabel}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.product = response[0]; // eslint-disable-line prefer-destructuring
    await this.fetchPlan(response[0].id, planLabel);
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

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.plan = response[0]; // eslint-disable-line prefer-destructuring
  }

  render() {
    return <manifold-plan-details scrollLocked={false} plan={this.plan} product={this.product} />;
  }
}

Tunnel.injectProps(ManifoldPlan, ['restFetch']);
