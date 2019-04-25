import { FunctionalComponent } from '@stencil/core';
import { LockedFeature } from './LockedFeature';
import { FeatureInput } from './FeatureInput';

const getCustomValue = (feature: Catalog.ExpandedFeature, value: number | string | boolean) => {
  // TODO get actual value
  console.log({ feature, value });
  return value;
};

interface CustomFeatureProps {
  feature: Catalog.ExpandedFeature;
  value: string | number | boolean;
}

export const CustomFeature: FunctionalComponent<CustomFeatureProps> = ({ feature, value }) => {
  const numberLocked = feature.type === 'number' && !feature.upgradable && !feature.downgradable;
  const locked = !feature.upgradable || !feature.downgradable;

  if (numberLocked || locked) {
    return <LockedFeature>{getCustomValue(feature, value)}</LockedFeature>;
  }

  return <FeatureInput feature={feature} value={getCustomValue(feature, value)} />;
};
