import { h, Component, Prop } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import { FeatureName } from './components/FeatureName';
import { FeatureValue } from './components/FeatureValue';
import { $ } from '../../utils/currency';
import logger from '../../utils/logger';

@Component({
  tag: 'manifold-resource-details-view',
  styleUrl: 'style.css',
  shadow: true,
})
export class ManifoldResourceDetails {
  @Prop() data?: Gateway.Resource;

  @logger()
  render() {
    if (this.data) {
      const { expanded_features, name } = this.data.plan as Gateway.ResolvedPlan;
      const { estimated_cost, features: customFeatures = [] } = this.data;
      return (
        <div class="container">
          <h3 class="heading">Plan Features</h3>
          <div class="details">
            {estimated_cost && [
              <span class="amount">{$(estimated_cost.cost)}</span>,
              <span class="suffix">/mo</span>,
            ]}
            <p class="plan-name">{name}</p>
          </div>
          <dl class="features">
            {expanded_features.map(feature => {
              const customFeature = customFeatures.find(({ label }) => label === feature.label);
              const customValue = customFeature && customFeature.value.value;

              return [
                <dt class="feature-name">
                  <FeatureName feature={feature} />
                </dt>,
                <dd class="feature-value">
                  <FeatureValue feature={feature} value={customValue} />
                </dd>,
              ];
            })}
          </dl>
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
