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
  @Prop() url: string = 'https://api.stage.manifold.co/v1/';
  @State() cost: number;
  @Watch('features') watchHandler(newValue: UserFeatures) {
    this.calculateCost(newValue);
  }

  componentWillLoad() {
    if (!this.planID) return;

    // eslint-disable-next-line consistent-return
    return this.calculateCost(this.features);
  }

  async calculateCost(features: UserFeatures) {
    fetch(`${this.connection.catalog}/id/plan/${this.planID}/cost`, {
      method: 'POST',
      body: JSON.stringify({ features }),
    })
      .then(response => response.json())
      .then(({ cost }) => {
        this.cost = cost;
      });
  }

  render() {
    if (!this.cost) return null;

    const cost = $(this.cost);

    return (
      <div class="cost" itemprop="price">
        <span itemprop="priceCurrency">$</span>
        <span itemprop="price">{cost}</span>
        <small>&nbsp;/&nbsp;month</small>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldProductCost, ['connection']);
