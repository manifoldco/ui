import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { $ } from '../../utils/currency';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';

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

    // eslint-disable-next-line consistent-return
    return this.calculateCost();
  }

  async calculateCost() {
    if (this.controller) this.controller.abort(); // If a request is in flight, cancel it
    this.controller = new AbortController();
    return fetch(`${this.connection.gateway}/id/plan/${this.planID}/cost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features: this.features }),
      signal: this.controller.signal,
    })
      .then(response => response.json())
      .then(({ cost }) => {
        this.cost = cost;
        this.controller = undefined; // Request is completed, so we don’t need the signal
      });
  }

  render() {
    if (!this.cost) return null;

    const cost = $(this.cost);

    return (
      <div class="cost" itemprop="price">
        <span itemprop="price">{cost}</span>
        <small>&nbsp;/&nbsp;month</small>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldProductCost, ['connection']);
