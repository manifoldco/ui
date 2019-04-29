import { FunctionalComponent } from '@stencil/core';

import { CustomFeature } from './CustomFeature';
import { MeasurableFeatureUsageDisplay } from './MeasurableFeatureUsageDisplay';
import { FeatureDisplay } from './FeatureDisplay';

interface FeatureValueProps {
  feature: Catalog.ExpandedFeature;
  value?: number | string | boolean;
  onChange?: (e: CustomEvent) => void;
}

export const FeatureValue: FunctionalComponent<FeatureValueProps> = ({
  feature,
  value = '',
  onChange = () => {},
}) => {
  if (feature.customizable) {
    return <CustomFeature feature={feature} value={value} onChange={onChange} />;
  }
  if (feature.measurable) {
    return <MeasurableFeatureUsageDisplay feature={feature} />;
  }

  let displayValue;

  switch (feature.type) {
    case 'boolean':
      // HACK: The display values doesn't exist in this version of the feature object.
      displayValue = feature.value_string === 'true' ? 'Yes' : 'No';
      break;
    case 'number':
      displayValue = feature.value_string && parseFloat(feature.value_string).toLocaleString();
      break;
    default:
    case 'string':
      displayValue = feature.value_string;
      break;
  }
  console.log({ displayValue });
  return <FeatureDisplay value={displayValue} />;
};
