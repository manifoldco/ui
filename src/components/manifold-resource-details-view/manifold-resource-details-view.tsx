import { h, Component, Prop } from '@stencil/core';

import { FeatureName } from '../manifold-plan-details/components/FeatureName';
import { FeatureValue } from './components/FeatureValue';

import { Resource } from '../../types/graphql';
import { fixedFeatureDisplayValue, meteredFeatureDisplayValue } from '../../utils/plan';
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
    if (this.data && this.data.plan) {
      const { displayName, fixedFeatures, meteredFeatures, configurableFeatures } = this.data.plan;
      return (
        <div class="container">
          <h3 class="heading">Plan Features</h3>
          <div class="details">
            {/* TODO: add resource cost when available in GraphQL API. */}
            {/* {cost && [<span class="amount">{$(cost)}</span>, <span class="suffix">/mo</span>]} */}
            <p class="plan-name">{displayName}</p>
          </div>
          <dl class="features">
            {fixedFeatures &&
              fixedFeatures.edges.map(({ node: feature }) => {
                const displayValue = fixedFeatureDisplayValue(feature);
                return [
                  <FeatureName name={feature.displayName} />,
                  <dd class="feature-value">
                    <FeatureValue value={displayValue} />
                  </dd>,
                ];
              })}
            {meteredFeatures &&
              meteredFeatures.edges.map(({ node: feature }) => {
                const displayValue = meteredFeatureDisplayValue(feature);
                return [
                  <FeatureName name={feature.displayName} />,
                  <dd class="feature-value">
                    <FeatureValue value={displayValue} />
                  </dd>,
                ];
              })}
            {configurableFeatures &&
              configurableFeatures.edges.map(({ node: feature }) => {
                return [
                  <FeatureName name={feature.displayName} />,
                  <dd class="feature-value">
                    {/* TODO: add value when resources features available in GraphQL API. */}
                    <FeatureValue value="Custom" />
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
