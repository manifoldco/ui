import { h, FunctionalComponent } from '@stencil/core';

import { featureCost, meteredFeatureDisplayValue, pricingTiers, NO } from '../../../utils/plan';
import { $ } from '../../../utils/currency';
import { pluralize } from '../../../utils/string';
import { PlanMeteredFeature } from '../../../types/graphql';

const withCommas = new Intl.NumberFormat().format;

const NoTier: FunctionalComponent = () => (
  <span class="value" data-value={NO}>
    {NO}
  </span>
);

const SingleTier: FunctionalComponent<PlanMeteredFeature> = feature => {
  const displayValue = meteredFeatureDisplayValue(feature);

  return <span class="value">{displayValue}</span>;
};

const MultiTier: FunctionalComponent<PlanMeteredFeature> = ({ numericDetails }) => {
  const tiers = pricingTiers(numericDetails);
  return (
    <table class="feature-table">
      <tbody>
        {tiers.map(({ cost, to, from, per, unit }) => {
          const unitDisplay = per === 1 ? ` / ${unit}` : ` until ${withCommas(per)}`;

          return (
            <tr>
              <td>
                {withCommas(from)}
                {to === Infinity ? '+' : ` – ${withCommas(to)}`}
                {` ${pluralize(unit)}`}
              </td>
              <td>{cost === 0 ? 'Free' : `${$(featureCost(cost * per))}${unitDisplay}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface MeteredFeatureProps {
  feature: PlanMeteredFeature;
}

export const MeteredFeature: FunctionalComponent<MeteredFeatureProps> = ({ feature }) => {
  const tierCount = feature.numericDetails.costTiers ? feature.numericDetails.costTiers.length : 0;

  switch (tierCount) {
    case 0:
      return <NoTier />;
    case 1:
      return <SingleTier {...feature} />;
    default:
      return <MultiTier {...feature} />;
  }
};
