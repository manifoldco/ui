import { FunctionalComponent } from '@stencil/core';

import { CustomFeatureDisplay } from './CustomFeatureDisplay';
import { StaticFeature } from './StaticFeature';

interface FeatureValueDisplayProps {
  feature: Catalog.ExpandedFeature;
  value?: number | string | boolean;
}

export const FeatureValueDisplay: FunctionalComponent<FeatureValueDisplayProps> = ({
  feature,
  value,
}) => {
  if (feature.customizable) {
    return <CustomFeatureDisplay feature={feature} value={value} />;
  }

  return <StaticFeature feature={feature} />;
};
