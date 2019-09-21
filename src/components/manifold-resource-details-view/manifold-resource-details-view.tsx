import { h, Component, Prop } from '@stencil/core';
import { Resource } from '../../types/graphql';
import { $ } from '../../utils/currency';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

@Component({
  tag: 'manifold-resource-details-view',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldResourceDetails {
  @Prop() data?: Resource;

  @loadMark()
  componentWillLoad() {}

  @logger()
  render() {
    // TODO: re-add estimated cost & features when supported by GraphQL

    if (this.data) {
      return (
        <div class="container">
          <h3 class="heading">Plan</h3>
          <div class="details">
            {this.data.plan && [
              <span class="amount">{$(this.data.plan.cost)}</span>,
              <span class="suffix">/mo</span>,
              <p class="plan-name">{this.data.plan.displayName}</p>,
            ]}
          </div>
        </div>
      );
    }

    // 💀
    return (
      <div class="container">
        <h3 class="heading">Plan Features</h3>
        <div class="details">
          <span class="amount">
            <manifold-skeleton-text>0.00/mo</manifold-skeleton-text>
          </span>
          <p class="plan-name">
            <manifold-skeleton-text>Plan Name</manifold-skeleton-text>
          </p>
        </div>
        <dl class="features">
          <dt class="feature-name">
            <manifold-skeleton-text>Feature Name</manifold-skeleton-text>
          </dt>
          <dd class="feature-value">
            <manifold-skeleton-text>Feature Value</manifold-skeleton-text>
          </dd>

          <dt class="feature-name">
            <manifold-skeleton-text>
              The greatest and best feature in the world
            </manifold-skeleton-text>
          </dt>
          <dd class="feature-value">
            <manifold-skeleton-text>Tribute</manifold-skeleton-text>
          </dd>
          <dt class="feature-name">
            <manifold-skeleton-text>Another Feature Name</manifold-skeleton-text>
          </dt>
          <dd class="feature-value">
            <manifold-skeleton-text>Another Feature Value</manifold-skeleton-text>
          </dd>
        </dl>
      </div>
    );
  }
}
