import { FunctionalComponent } from '@stencil/core';
import { stringFeatureOptions } from '../../../utils/plan';

const onChange = (e: Event) =>
  new CustomEvent('manifold-resource-feature-change', { detail: e && '' });

interface FeatureInputProps {
  feature: Catalog.ExpandedFeature;
  value: number | string | boolean;
}

export const FeatureInput: FunctionalComponent<FeatureInputProps> = ({ feature, value = '' }) => {
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
