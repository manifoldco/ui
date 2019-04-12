import { FunctionalComponent } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import {
  numberFeatureDisplayValue,
  numberFeatureMeasurableDisplayValue,
  numberFeatureDefaultValue,
} from '../../../utils/plan';
import { LockedFeature } from './LockedFeature';

interface NumberFeatureProps {
  features: UserFeatures;
  feature: Catalog.ExpandedFeature;
  isExistingResource?: boolean;
  onChange: (e: CustomEvent) => void;
}

export const NumberFeature: FunctionalComponent<NumberFeatureProps> = ({
  features,
  feature,
  isExistingResource,
  onChange,
}) => {
  if (!feature.value) return '';

  const displayValue = feature.measurable
    ? numberFeatureMeasurableDisplayValue(feature.value)
    : numberFeatureDisplayValue(feature.value);

  // standard feature
  if (!feature.customizable) {
    return displayValue || '';
  }

  // locked feature
  const isLocked = !feature.upgradable && !feature.downgradable;
  if (isExistingResource && isLocked) {
    return <LockedFeature>{displayValue}</LockedFeature>;
  }

  if (!feature.value.numeric_details) return '';

  // customizable feature
  const value =
    typeof features[feature.label] === 'number'
      ? (features[feature.label] as number)
      : numberFeatureDefaultValue(feature.value);

  return (
    <manifold-number-input
      aria-label={feature.name}
      increment={feature.value.numeric_details.increment}
      max={feature.value.numeric_details.max}
      min={feature.value.numeric_details.min}
      name={feature.label}
      onUpdateValue={onChange}
      suffix={feature.value.numeric_details.suffix}
      value={value}
      decrement-disabled-label="This feature is not downgradable"
      increment-disabled-label="This feature is not upgradable"
    />
  );
};
