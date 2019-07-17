import { h, FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';
import { booleanFeatureDisplayValue, booleanFeatureDefaultValue } from '../../../utils/plan';
import { Catalog } from '../../../types/catalog';
import { LockedFeature } from './LockedFeature';

interface BooleanFeatureProps {
  feature: Catalog.ExpandedFeature;
  isExistingResource?: boolean;
  onChange?: (e: CustomEvent) => void;
}

export const BooleanFeature: FunctionalComponent<BooleanFeatureProps> = ({
  feature,
  isExistingResource,
  onChange,
}) => {
  if (!feature.value) {
    return '';
  }

  const displayValue = booleanFeatureDisplayValue(feature.value);

  // standard feature
  if (!feature.customizable) {
    return (
      <span class="value" data-value={displayValue}>
        <manifold-icon class="icon" icon={check} marginRight />
        {displayValue}
      </span>
    );
  }

  // locked feature
  const isLocked = !feature.upgradable || !feature.downgradable;
  if (isExistingResource && isLocked) {
    return <LockedFeature>{displayValue}</LockedFeature>;
  }

  // customizable feature
  return (
    <manifold-toggle
      aria-label={feature.name}
      defaultValue={feature.value && booleanFeatureDefaultValue(feature.value)}
      name={feature.label}
      onUpdateValue={(e: CustomEvent) => onChange && onChange(e)}
    />
  );
};
