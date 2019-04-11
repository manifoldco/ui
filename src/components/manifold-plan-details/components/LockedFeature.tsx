import { FunctionalComponent } from '@stencil/core';

interface LockedFeatureProps {}

export const LockedFeature: FunctionalComponent<LockedFeatureProps> = (_, children) => {
  return (
    <manifold-tooltip labelText="Feature cannot be changed from current plan">
      <span class="value" data-value={children} data-locked>
        <manifold-icon class="icon" icon="lock" marginRight />
        {children}
      </span>
    </manifold-tooltip>
  );
};
