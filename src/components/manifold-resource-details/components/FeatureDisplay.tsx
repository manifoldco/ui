import { FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';

export const FeatureDisplay: FunctionalComponent = (_, value) => {
  return (
    <span class="value" data-value={value}>
      <manifold-icon class="icon" icon={check} marginRight />
      {value}
    </span>
  );
};
