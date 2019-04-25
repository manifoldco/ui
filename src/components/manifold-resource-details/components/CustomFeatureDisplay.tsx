import { FunctionalComponent } from '@stencil/core';
import { MeasurableFeatureUsageDisplay } from './MeasurableFeatureUsageDisplay';
import { NonMeasurableFeatureDisplay } from './NonMeasurableFeatureDisplay';

const getCustomValue = (feature: Catalog.ExpandedFeature, value?: number | string | boolean) => {
  // TODO get actual value
  console.log({ feature, value });
  return value;
};

interface CustomFeatureDisplayProps {
  feature: Catalog.ExpandedFeature;
  value?: string | number | boolean;
}

export const CustomFeatureDisplay: FunctionalComponent<CustomFeatureDisplayProps> = ({
  feature,
  value,
}) => {
  if (feature.measurable)
    return (
      <MeasurableFeatureUsageDisplay feature={feature} value={getCustomValue(feature, value)} />
    );

  return <NonMeasurableFeatureDisplay feature={feature} value={getCustomValue(feature, value)} />;
};
