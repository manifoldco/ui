import { FunctionalComponent } from '@stencil/core';
import {
  stringFeatureOptions,
  stringFeatureDefaultValue,
  stringFeatureDisplayValue,
} from '../../../utils/plan';
import { LockedFeature } from './LockedFeature';

interface StringFeatureProps {
  feature: Catalog.ExpandedFeature;
  isExistingResource?: boolean;
  onChange: (e: CustomEvent) => any;
}

export const StringFeature: FunctionalComponent<StringFeatureProps> = ({
  feature,
  isExistingResource,
  onChange,
}) => {
  if (!feature.value) return '';

  const displayValue = stringFeatureDisplayValue(feature.value);

  // standard feature
  if (!feature.customizable) {
    return displayValue;
  }

  // locked feature
  const isLocked = !feature.upgradable || !feature.downgradable;
  if (isExistingResource && isLocked) {
    return <LockedFeature>{displayValue}</LockedFeature>;
  }

  // customizable feature
  return (
    <manifold-select
      aria-label={feature.name}
      name={feature.label}
      options={stringFeatureOptions(feature.values || [])}
      onUpdateValue={onChange}
      defaultValue={stringFeatureDefaultValue(feature.value)}
    />
  );
};
