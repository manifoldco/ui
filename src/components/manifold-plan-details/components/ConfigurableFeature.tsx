import { h, FunctionalComponent } from '@stencil/core';

import { PlanConfigurableFeature } from '../../../types/graphql';
import { Gateway } from '../../../types/gateway';

import {
  numberFeatureDefaultValue,
  booleanFeatureDefaultValue,
  stringFeatureOptions,
} from '../../../utils/plan';

interface ConfigurableFeatureProps {
  feature: PlanConfigurableFeature;
  features: Gateway.FeatureMap;
  isExistingResource?: boolean;
  onChange: (e: CustomEvent) => void;
}

export const ConfigurableFeature: FunctionalComponent<ConfigurableFeatureProps> = ({
  feature,
  features,
  onChange,
}) => {
  const currentValue = features[feature.label];

  if (feature.type === 'BOOLEAN') {
    const { displayName, label } = feature;
    return (
      <manifold-toggle
        aria-label={displayName}
        defaultValue={booleanFeatureDefaultValue(feature)}
        name={label}
        onUpdateValue={(e: CustomEvent) => onChange && onChange(e)}
      />
    );
  }

  if (feature.type) {
    const { displayName, label, options } = feature;
    return (
      <manifold-select
        aria-label={displayName}
        name={label}
        options={stringFeatureOptions(options || [])}
        onUpdateValue={onChange}
        defaultValue={feature.label}
      />
    );
  }

  if (feature.type === 'NUMBER') {
    const value =
      typeof currentValue === 'number' ? currentValue : numberFeatureDefaultValue(feature);
    const { displayName, numericDetails } = feature;

    const { increment, min, max, unit } = numericDetails || {};

    return (
      <manifold-number-input
        aria-label={displayName}
        increment={increment}
        max={max}
        min={min}
        name={displayName}
        onUpdateValue={onChange}
        suffix={unit}
        value={value}
        decrement-disabled-label="This feature is not downgradable"
        increment-disabled-label="This feature is not upgradable"
      />
    );
  }

  return null;
};
