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
  // features: Gateway.FeatureMap;
  // isExistingResource?: boolean;
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

  // locked feature
  // const isLocked = !feature.upgradable && !feature.downgradable;
  // if (isExistingResource && isLocked) {
  //   return <LockedFeature>{displayValue}</LockedFeature>;
  // }

  // if (!feature.value.numeric_details) {
  //   return '';
  // }

  // customizable feature
  // const value =
  //   typeof features[feature.label] === 'number'
  //     ? (features[feature.label] as number)
  //     : numberFeatureDefaultValue(feature.value);

  // return (
  //   <manifold-number-input
  //     aria-label={feature.displayName}
  //     increment={feature.numericDetails.}
  //     max={feature.value.numeric_details.max}
  //     min={feature.value.numeric_details.min}
  //     name={feature.label}
  //     onUpdateValue={onChange}
  //     suffix={feature.value.numeric_details.suffix}
  //     value={value}
  //     decrement-disabled-label="This feature is not downgradable"
  //     increment-disabled-label="This feature is not upgradable"
  //   />
  // );
};
