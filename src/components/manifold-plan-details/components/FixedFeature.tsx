import { h, FunctionalComponent } from '@stencil/core';
import { check } from '@manifoldco/icons';
import { PlanFixedFeatureEdge } from '../../../types/graphql';

export const fixedDisplayValue = (displayValue: string = '') => {
  // normalize true/false features
  if (['true', 'yes'].includes(displayValue.toLowerCase())) {
    return (
      <span class="value" data-value="true">
        <manifold-icon class="icon" icon={check} marginRight /> YES
      </span>
    );
  }
  if (['false', 'no', 'none'].includes(displayValue.toLowerCase())) {
    return (
      <span class="value" data-value="false">
        NO
      </span>
    );
  }
  return displayValue;
};

interface FixedFeatureProps {
  fixedFeature: PlanFixedFeatureEdge;
}

const FixedFeature: FunctionalComponent<FixedFeatureProps> = ({ fixedFeature }) => {
  const {
    node: { displayName, displayValue },
  } = fixedFeature;
  return [
    <dt class="feature-name">{displayName}</dt>,
    <dd class="feature-value">{fixedDisplayValue(displayValue)}</dd>,
  ];
};

export default FixedFeature;
