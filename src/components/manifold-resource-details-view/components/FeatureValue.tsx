import { h, FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';

interface FeatureValueProps {
  value?: string;
}

export const FeatureValue: FunctionalComponent<FeatureValueProps> = ({ value }) => {
  return (
    <span class="value" data-value={value}>
      <manifold-icon class="icon" icon={check} marginRight />
      {value}
    </span>
  );
};
