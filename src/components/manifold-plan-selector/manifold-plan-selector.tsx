import { Component, State, Prop, Element } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({
  tag: 'manifold-plan-selector',
  shadow: true,
})
export class ManifoldPlanSelector {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** _(optional)_ Hide CTA? */
  @Prop() hideCta?: boolean;
  /** _(optional)_ Link format structure, with `:product`, `:plan`, and `:features` placeholders */
  @Prop() linkFormat?: string;
  /** URL-friendly slug (e.g. `"jawsdb-mysql"`) */
  @Prop() productLabel: string;
  /** _(optional)_ Is this modifying an existing resource? */
  @Prop() resourceId?: string;
  @State() product: Catalog.ExpandedProduct;
  @State() plans: Catalog.Plan[];

  async componentWillLoad() {
    await fetch(`${this.connection.catalog}/products/?label=${this.productLabel}`, withAuth())
      .then(response => response.json())
      .then((products: Catalog.ExpandedProduct[]) => {
        const [product] = products;
        this.product = product;
        fetch(`${this.connection.catalog}/plans/?product_id=${product.id}`)
          .then(response => response.json())
          .then((plans: Catalog.ExpandedPlan[]) => {
            this.plans = [...plans.sort((a, b) => a.body.cost - b.body.cost)];
          });
      });
  }

  render() {
    if (!this.product || !this.plans) return null;
    return (
      <manifold-active-plan
        hideCta={this.hideCta}
        isExistingResource={!!this.resourceId}
        linkFormat={this.linkFormat}
        plans={this.plans}
        product={this.product}
      />
    );
  }
}

Tunnel.injectProps(ManifoldPlanSelector, ['connection']);
