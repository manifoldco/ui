import { h, FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';

interface FeatureDisplayProps {
  value?: boolean | number | string;
}

export const FeatureDisplay: FunctionalComponent<FeatureDisplayProps> = ({ value }) => {
  return (
    <span class="value" data-value={value}>
      <manifold-icon class="icon" icon={check} marginRight />
      {value}
    </span>
  );
};
