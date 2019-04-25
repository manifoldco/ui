import { FunctionalComponent } from '@stencil/core';

interface MeasurableFeatureUsageDisplayProps {
  // features: UserFeatures;
  feature: Catalog.ExpandedFeature;
  value?: string | number | boolean;
}

export const MeasurableFeatureUsageDisplay: FunctionalComponent<
  MeasurableFeatureUsageDisplayProps
> = ({ feature, value = feature.value_string }) => {
  // TODO use real data for mesurable feature
  return (
    <span>
      <progress value="5" max="10" /> {value}
    </span>
  );
};
