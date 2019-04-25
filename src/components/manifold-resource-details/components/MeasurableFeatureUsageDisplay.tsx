import { FunctionalComponent } from '@stencil/core';

interface MeasurableFeatureUsageDisplayProps {
  // features: UserFeatures;
  feature: Catalog.ExpandedFeature;
  value?: string | number | boolean;
}

export const MeasurableFeatureUsageDisplay: FunctionalComponent<
  MeasurableFeatureUsageDisplayProps
> = ({ feature, value = feature.value_string }) => {
  // TODO build usage UI
  return <span>{value}</span>;
};
