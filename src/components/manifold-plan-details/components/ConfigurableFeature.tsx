import { h, FunctionalComponent } from '@stencil/core';
import { $ } from '../../../utils/currency';
import { PlanConfigurableFeatureEdge, PlanFeatureType } from '../../../types/graphql';
import { Option } from '../../../types/Select';
import { fixedDisplayValue } from './FixedFeature';

interface ConfigurableFeatureProps {
  configurableFeature?: PlanConfigurableFeatureEdge;
  onChange: (e: CustomEvent) => void;
  value?: string | number | boolean;
  readOnly?: boolean;
}

const ConfigurableFeature: FunctionalComponent<ConfigurableFeatureProps> = ({
  configurableFeature,
  onChange,
  value,
  readOnly,
}) => {
  if (!configurableFeature) {
    return [];
  }

  const {
    node: { type, displayName, label, featureOptions, numericDetails },
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

  if (readOnly) {
    let displayValue;

    switch (typeof value) {
      case 'boolean':
        displayValue = fixedDisplayValue(
          featureOptions?.find(o => o.value === `${value ? 'true' : 'false'}`)?.displayName
        );
        break;
      case 'string':
        displayValue = fixedDisplayValue(featureOptions?.find(o => o.value === value)?.displayName);
        break;
      case 'number':
        displayValue = `${value} ${numericDetails && numericDetails.unit}`;
        break;
      default:
        displayValue = <em>No value selected.</em>;
    }

    return [
      <dt class="feature-name">{displayName}</dt>,
      <dd class="feature-value">{displayValue}</dd>,
    ];
  }

  switch (type) {
    // string
    case PlanFeatureType.String: {
      const selectOptions: Option[] = featureOptions
        ? featureOptions.map(o => ({
            label: `${o.displayName} (${$(o.cost)})`,
            value: o.value,
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
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </dd>,
      ];

    default:
      return [];
  }
};

export default ConfigurableFeature;
