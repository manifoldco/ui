import { FunctionalComponent } from '@stencil/core';
import { LockedFeature } from './LockedFeature';
import { stringFeatureOptions } from '../../../utils/plan';

const getCustomValue = (feature: Catalog.ExpandedFeature, value: number | string | boolean) => {
  // TODO get actual value
  console.log({ feature, value });
  return value;
};

interface CustomFeatureProps {
  feature: Catalog.ExpandedFeature;
  value: string | number | boolean;
  onChange: (e: CustomEvent) => void;
}

export const CustomFeature: FunctionalComponent<CustomFeatureProps> = ({
  feature,
  value,
  onChange,
}) => {
  const numberLocked = feature.type === 'number' && !feature.upgradable && !feature.downgradable;
  const locked = !feature.upgradable || !feature.downgradable;

  if (numberLocked || locked) {
    return <LockedFeature>{getCustomValue(feature, value)}</LockedFeature>;
  }

  switch (feature.type) {
    case 'boolean':
      return (
        <manifold-toggle
          aria-label={feature.name}
          defaultValue={value as boolean}
          name={feature.label}
          onUpdateValue={(e: CustomEvent) => onChange(e)}
        />
      );
    case 'number':
      return (
        <manifold-number-input
          {...(feature.value ? feature.value.numeric_details : {})}
          aria-label={feature.name}
          name={feature.label}
          onUpdateValue={onChange}
          value={value as number}
          decrement-disabled-label="This feature is not downgradable"
          increment-disabled-label="This feature is not upgradable"
        />
      );
    case 'string':
      return (
        <manifold-select
          aria-label={feature.name}
          name={feature.label}
          options={stringFeatureOptions(feature.values || [])}
          onUpdateValue={onChange}
          defaultValue={value as string}
        />
      );
    default:
      return <div />;
  }
};
