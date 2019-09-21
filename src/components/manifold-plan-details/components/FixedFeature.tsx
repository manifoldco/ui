import { h, FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';

import { PlanFixedFeature } from '../../../types/graphql';
import { fixedFeatureDisplayValue } from '../../../utils/plan';

interface FixedFeatureProps {
  feature: PlanFixedFeature;
}

export const FixedFeature: FunctionalComponent<FixedFeatureProps> = ({ feature }) => {
  const displayValue = fixedFeatureDisplayValue(feature);
  return (
    <span class="value" data-value={displayValue}>
      <manifold-icon class="icon" icon={check} marginRight />
      {displayValue}
    </span>
  );
};
