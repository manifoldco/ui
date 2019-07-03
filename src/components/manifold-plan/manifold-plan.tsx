import { h, Component, State, Prop, Element, Watch } from '@stencil/core';
import { Catalog } from '../../types/catalog';
import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-plan' })
export class ManifoldPlan {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
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
    if (!productLabel || !planLabel) {
      return;
    }

    this.product = undefined;
    const { catalog } = this.connection;

    const productsResp = await fetch(`${catalog}/products/?label=${productLabel}`, withAuth(this.authToken));
    const products: Catalog.ExpandedProduct[] = await productsResp.json();

    this.product = products[0]; // eslint-disable-line prefer-destructuring
    this.fetchPlan(products[0].id, planLabel);
  }

  async fetchPlan(productId: string, planLabel: string) {
    this.plan = undefined;
    const { catalog } = this.connection;

    const plansResp = await fetch(`${catalog}/plans/?product_id=${productId}&label=${planLabel}`, withAuth(this.authToken));
    const plans: Catalog.ExpandedPlan[] = await plansResp.json();

    this.plan = plans[0]; // eslint-disable-line prefer-destructuring
  }

  render() {
    return (
      <manifold-plan-details
        plan={this.plan}
        product={this.product}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlan, ['connection', 'authToken']);
