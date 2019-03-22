import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { $ } from '../../utils/currency';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import { planCost } from '../../utils/plan';

@Component({ tag: 'manifold-product-cost', styleUrl: 'manifold-product-cost.css', shadow: true })
export class ManifoldProductCost {
  @Element() el: HTMLElement;
  @Prop() connection: Connection;
  @Prop() features: UserFeatures;
  @Prop() planID: string;
  @State() controller?: AbortController;
  @State() cost: number;
  @Watch('planID') planChanged() {
    this.calculateCost();
  }
  @Watch('features') featureChanged() {
    this.calculateCost();
  }

  componentWillLoad() {
    if (!this.planID) return;
    return this.calculateCost(); // eslint-disable-line consistent-return
  }

  calculateCost() {
    if (this.controller) this.controller.abort(); // If a request is in flight, cancel it
    this.controller = new AbortController();

    return planCost(this.connection, {
      planID: this.planID,
      features: this.features,
      init: { signal: this.controller.signal },
    }).then(({ cost }: Gateway.Price) => {
      this.cost = cost;
      this.controller = undefined; // Request finished, so signal no longer needed
    });
  }

  render() {
    if (!this.cost) return null;

    return (
      <div class="cost" itemprop="price">
        <span itemprop="price">{$(this.cost)}</span>
        <small>&nbsp;/&nbsp;month</small>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldProductCost, ['connection']);
