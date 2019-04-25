import { FunctionalComponent } from '@stencil/core';

import { CustomFeature } from './CustomFeature';
import { MeasurableFeatureUsageDisplay } from './MeasurableFeatureUsageDisplay';
import { FeatureDisplay } from './FeatureDisplay';

interface FeatureValueProps {
  feature: Catalog.ExpandedFeature;
  value?: number | string | boolean;
}

export const FeatureValue: FunctionalComponent<FeatureValueProps> = ({ feature, value = '' }) => {
  if (feature.customizable) {
    return <CustomFeature feature={feature} value={value} />;
  }
  if (feature.measurable) {
    return <MeasurableFeatureUsageDisplay feature={feature} />;
  }
  return <FeatureDisplay>{feature.value_string}</FeatureDisplay>;
};
