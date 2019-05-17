import { h, FunctionalComponent } from '@stencil/core';
import { featureDescription } from '../../../utils/plan';

interface FeatureNameProps {
  feature: Catalog.ExpandedFeature;
}

export const FeatureName: FunctionalComponent<FeatureNameProps> = ({ feature }) => {
  const description = feature.value && featureDescription(feature.value);

  return (
    <span>
      {feature.name}
      {description && <p class="description">{description}</p>}
    </span>
  );
};
