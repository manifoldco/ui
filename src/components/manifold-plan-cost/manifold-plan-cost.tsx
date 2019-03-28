import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { $ } from '../../utils/currency';
import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import { planCost } from '../../utils/plan';

@Component({ tag: 'manifold-plan-cost', styleUrl: 'manifold-plan-cost.css', shadow: true })
export class ManifoldPlanCost {
  @Element() el: HTMLElement;
  @Prop() connection: Connection;
  @Prop() compact?: boolean = false;
  @Prop() features: UserFeatures = {};
  @Prop() planId: string;
  @State() controller?: AbortController;
  @State() cost: number;
  @Watch('planId') planChanged() {
    this.calculateCost();
  }
  @Watch('features') featureChanged() {
    this.calculateCost();
  }

  componentWillLoad() {
    if (this.planId) {
      return this.calculateCost();
    }

    return Promise.resolve();
  }

  calculateCost() {
    if (this.controller) this.controller.abort(); // If a request is in flight, cancel it
    this.controller = new AbortController();

    return planCost(this.connection, {
      planID: this.planId,
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
      <div class="cost" itemprop="price" data-compact={this.compact}>
        <span itemprop="price">{$(this.cost)}</span>
        <small>&nbsp;/&nbsp;month</small>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldPlanCost, ['connection']);
