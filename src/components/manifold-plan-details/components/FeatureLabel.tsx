import { h, FunctionalComponent } from '@stencil/core';
// import { featureDescription } from '../../../utils/plan';

interface FeatureLabelProps {
  name: string;
  description?: string;
}

export const FeatureLabel: FunctionalComponent<FeatureLabelProps> = ({ name, description }) => {
  // const description = feature.value && featureDescription(feature.value);
  return (
    <dt class="feature-name">
      {name}
      {description && <p class="description">{description}</p>}
    </dt>
  );
};
