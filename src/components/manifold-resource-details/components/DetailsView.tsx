import { h, FunctionalComponent } from '@stencil/core';

import { Plan, Resource } from '../../../types/graphql';
import { FeatureName } from './FeatureName';
import { FeatureValue } from './FeatureValue';
import { convertPlanData } from '../../../utils/plan';
import { Catalog } from '../../../types/catalog';

interface DetailsViewDisplayProps {
  gqlData?: Resource;
  loading: boolean;
}

export const DetailsView: FunctionalComponent<DetailsViewDisplayProps> = ({ gqlData, loading }) => {
  let plan: Plan | null = null;
  if (!loading && gqlData) {
    if (gqlData.plan) {
      plan = gqlData.plan;
    }
  }

  if (plan) {
    // TODO: When everything has been converted to GraphQL, start using the gql types here
    const convertedPlan = convertPlanData(plan);
    const {
      body: { name, expanded_features },
    } = convertedPlan;

    return (
      <div class="container">
        <h3 class="heading">Plan Features</h3>
        <div class="details">
          <p class="plan-name">{name}</p>
        </div>
        <dl class="features">
          {expanded_features &&
            expanded_features.map((feature: Catalog.ExpandedFeature) => [
              <dt class="feature-name">
                <FeatureName feature={feature} />
              </dt>,
              <dd class="feature-value">
                <FeatureValue feature={feature} />
              </dd>,
            ])}
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
};
