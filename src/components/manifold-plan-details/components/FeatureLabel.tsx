import { h, FunctionalComponent } from '@stencil/core';

interface FeatureLabelProps {
  name: string;
  description?: string;
}

export const FeatureLabel: FunctionalComponent<FeatureLabelProps> = ({ name, description }) => (
  <dt class="feature-name">
    {name}
    {description && <p class="description">{description}</p>}
  </dt>
);
