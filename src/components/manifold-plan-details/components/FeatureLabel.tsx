import { h, FunctionalComponent } from '@stencil/core';
import { featureDescription } from '../../../utils/plan';
import { Catalog } from '../../../types/catalog';

interface FeatureLabelProps {
  feature: Catalog.ExpandedFeature;
}

export const FeatureLabel: FunctionalComponent<FeatureLabelProps> = ({ feature }) => {
  const description = feature.value && featureDescription(feature.value);

  return (
    <dt class="feature-name">
      {feature.name}
      {description && <p class="description">{description}</p>}
    </dt>
  );
};
