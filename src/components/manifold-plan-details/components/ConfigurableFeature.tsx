import { h, FunctionalComponent } from '@stencil/core';

import { PlanConfigurableFeatureEdge, PlanFeatureType } from '../../../types/graphql';
import { Option } from '../../../types/Select';

interface ConfigurableFeatureProps {
  configurableFeature?: PlanConfigurableFeatureEdge;
  onChange: (e: CustomEvent) => void;
  value?: string | number | boolean;
}

const ConfigurableFeature: FunctionalComponent<ConfigurableFeatureProps> = ({
  configurableFeature,
  onChange,
  value,
}) => {
  if (!configurableFeature) {
    return [];
  }

  const {
    node: { type, displayName, label, options, numericDetails },
  } = configurableFeature;

  /**
   * TODO: reimplement this tooltip when upgradable/downgradable is reintroduced to GraphQL
   * <manifold-tooltip labelText="Feature cannot be changed from current plan">
   *   <span class="value" data-value={children} data-locked>
   *     <manifold-icon class="icon" icon={lock} marginRight />
   *     {children}
   *   </span>
   * </manifold-tooltip>
   */

  switch (type) {
    // string
    case PlanFeatureType.String: {
      const selectOptions: Option[] = options
        ? options.map(option => ({
            label: option.displayName,
            value: option.label,
          }))
        : [];
      const defaultOption = value
        ? selectOptions.find(option => option.value === value)
        : undefined;

      return [
        <dt class="feature-name">{displayName}</dt>,
        <dd class="feature-value">
          <manifold-select
            aria-label={displayName}
            name={label}
            options={selectOptions}
            onUpdateValue={onChange}
            defaultValue={(defaultOption && `${defaultOption.value}`) || undefined}
          />
        </dd>,
      ];
    }

    // number
    case PlanFeatureType.Number:
      if (!numericDetails) {
        return [];
      }

      return [
        <dt class="feature-name">{displayName}</dt>,
        <dd class="feature-value">
          <manifold-number-input
            aria-label={displayName}
            decrement-disabled-label="This feature is not downgradable"
            increment-disabled-label="This feature is not upgradable"
            increment={numericDetails.increment}
            max={numericDetails.max}
            min={numericDetails.min}
            name={label}
            onUpdateValue={onChange}
            unit={numericDetails.unit}
            value={typeof value === 'number' ? value : undefined}
          />
        </dd>,
      ];

    // boolean
    case PlanFeatureType.Boolean:
      return [
        <dt class="feature-name">{displayName}</dt>,
        <dd class="feature-value">
          <manifold-toggle
            aria-label={displayName}
            defaultValue={!!value}
            name={label}
            onUpdateValue={(e: CustomEvent) => onChange && onChange(e)}
          />
        </dd>,
      ];

    default:
      return [];
  }
};

export default ConfigurableFeature;
