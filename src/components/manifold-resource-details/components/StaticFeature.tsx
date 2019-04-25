import { FunctionalComponent } from '@stencil/core';
import { MeasurableFeatureUsageDisplay } from './MeasurableFeatureUsageDisplay';
import { NonMeasurableFeatureDisplay } from './NonMeasurableFeatureDisplay';

interface StaticFeatureProps {
  feature: Catalog.ExpandedFeature;
}

export const StaticFeature: FunctionalComponent<StaticFeatureProps> = ({ feature }) => {
  if (feature.measurable) {
    return <MeasurableFeatureUsageDisplay feature={feature} />;
  }

  return <NonMeasurableFeatureDisplay feature={feature} />;
};
