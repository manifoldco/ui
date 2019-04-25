import { FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';

interface MeasurableFeatureDisplayProps {
  feature: Catalog.ExpandedFeature;
  value?: string | number | boolean;
}

export const NonMeasurableFeatureDisplay: FunctionalComponent<MeasurableFeatureDisplayProps> = ({
  feature,
  value = feature.value_string,
}) => {
  return (
    <span class="value" data-value={value}>
      <manifold-icon class="icon" icon={check} marginRight />
      {value}
    </span>
  );
};
