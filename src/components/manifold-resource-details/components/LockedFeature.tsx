import { FunctionalComponent } from '@stencil/core';
import { lock } from '@manifoldco/icons';

export const LockedFeature: FunctionalComponent = (_, children) => {
  return (
    <manifold-tooltip labelText="Feature cannot be changed from current plan">
      <span class="value" data-value={children} data-locked>
        <manifold-icon class="icon" icon={lock} marginRight />
        {children}
      </span>
    </manifold-tooltip>
  );
};
