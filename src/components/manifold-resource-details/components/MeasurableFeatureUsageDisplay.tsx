import { FunctionalComponent } from '@stencil/core';
import { $ } from '../../../utils/currency';

const COST_COEFFICIENT = 10000;

interface MeasurableFeatureUsageDisplayProps {
  feature: Catalog.ExpandedFeature;
}

export const MeasurableFeatureUsageDisplay: FunctionalComponent<
  MeasurableFeatureUsageDisplayProps
> = ({ feature }) => {
  // TODO add usage from billing api
  const { numeric_details = {} } = feature.value || {};
  const { cost_ranges = [], suffix } = numeric_details;

  return (
    <ul>
      {cost_ranges.map(range => (
        <li>
          {$((range.cost_multiple || 0) / COST_COEFFICIENT)} / {suffix} up to {range.limit} {suffix}
        </li>
      ))}
    </ul>
  );
};
