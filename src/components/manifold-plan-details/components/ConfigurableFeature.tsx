import { h, FunctionalComponent } from '@stencil/core';
import { lock } from '@manifoldco/icons';
import { $ } from '../../../utils/currency';
import {
  PlanConfigurableFeatureEdge,
  PlanFeatureType,
  PlanConfigurableFeature,
} from '../../../types/graphql';
import { Option } from '../../../types/Select';
import { fixedDisplayValue } from './FixedFeature';

interface ConfigurableFeatureProps {
  configurableFeature?: PlanConfigurableFeatureEdge;
  onChange: (e: CustomEvent) => void;
  value?: string | number | boolean;
  readOnly?: boolean;
  isExistingResource?: boolean;
}

const getDisplayValue = (
  value: unknown,
  { featureOptions, numericDetails }: PlanConfigurableFeature
) => {
  switch (typeof value) {
    case 'boolean':
      return fixedDisplayValue(
        featureOptions?.find(o => o.value === `${value ? 'true' : 'false'}`)?.displayName
      );
    case 'string':
      return fixedDisplayValue(featureOptions?.find(o => o.value === value)?.displayName);

    case 'number':
      return `${value} ${numericDetails?.unit || ''}`;

    default:
      return <em>No value selected.</em>;
  }
};

const ConfigurableFeature: FunctionalComponent<ConfigurableFeatureProps> = ({
  configurableFeature,
  onChange,
  value,
  readOnly,
  isExistingResource,
}) => {
  if (!configurableFeature) {
    return [];
  }

  const {
    node: { type, displayName, label, featureOptions, numericDetails, upgradable, downgradable },
  } = configurableFeature;

  if (isExistingResource && !upgradable && !downgradable) {
    return [
      <dt class="feature-name">{displayName}</dt>,
      <dd class="feature-value">
        <manifold-tooltip labelText="Feature cannot be resized on an existing resource.">
          <span class="value" data-value={value} data-locked>
            <manifold-icon class="icon" icon={lock} marginRight />
            {getDisplayValue(value, configurableFeature.node)}
          </span>
        </manifold-tooltip>
      </dd>,
    ];
  }

  if (readOnly) {
    return [
      <dt class="feature-name">{displayName}</dt>,
      <dd class="feature-value">{getDisplayValue(value, configurableFeature.node)}</dd>,
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
    case PlanFeatureType.Number: {
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
            max={isExistingResource && upgradable ? (value as number) : numericDetails.max}
            min={isExistingResource && downgradable ? (value as number) : numericDetails.min}
            name={label}
            onUpdateValue={onChange}
            unit={numericDetails.unit}
            value={typeof value === 'number' ? value : undefined}
            disabled={readOnly}
          />
        </dd>,
      ];
    }

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
