import { h, FunctionalComponent } from '@stencil/core';
import { lock } from '@manifoldco/icons';

interface LockedFeatureProps {
  value?: boolean | number | string;
}

export const LockedFeature: FunctionalComponent<LockedFeatureProps> = ({ value }) => {
  return (
    <manifold-tooltip labelText="Feature cannot be changed from current plan">
      <span class="value" data-value={value} data-locked>
        <manifold-icon class="icon" icon={lock} marginRight />
        {value}
      </span>
    </manifold-tooltip>
  );
};
