import { Component } from '@stencil/core';

@Component({
  tag: 'product-plans',
  styleUrl: 'product-plans.css',
  shadow: true,
})
export class ProductPlans {
  render() {
    return <div class="wrapper">Product Plans</div>;
  }
}
