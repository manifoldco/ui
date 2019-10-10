import { h, FunctionalComponent } from '@stencil/core';

import { PlanMeteredFeatureEdge, PlanMeteredFeatureNumericDetails } from '../../../types/graphql';
import { $ } from '../../../utils/currency';
import { pluralize } from '../../../utils/string';
import { featureCost, meteredFeatureDisplayValue, pricingTiers } from '../../../utils/plan';

function meteredFeatureCost(numericDetails: PlanMeteredFeatureNumericDetails) {
  const tiers = pricingTiers(numericDetails);

  if (tiers.length > 1) {
    const withCommas = new Intl.NumberFormat().format;
    return (
      <table class="feature-table">
        <tbody>
          {tiers.map(({ cost, from, per, to, unit }) => {
            const unitDisplay = per === 1 ? ` / ${unit}` : ` per ${withCommas(per)}`;

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
  }

  return meteredFeatureDisplayValue(numericDetails);
}

const MeteredFeature: FunctionalComponent<{ meteredFeature?: PlanMeteredFeatureEdge }> = ({
  meteredFeature,
}) => {
  if (!meteredFeature) {
    return [];
  }
  return [
    <dt class="feature-name">{meteredFeature.node.displayName}</dt>,
    <dd class="feature-value">{meteredFeatureCost(meteredFeature.node.numericDetails)}</dd>,
  ];
};

export default MeteredFeature;
