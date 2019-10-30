import { h, FunctionalComponent } from '@stencil/core';

import { PlanMeteredFeatureNumericDetails, ResourcePlansQuery } from '../../../types/graphql';
import { $ } from '../../../utils/currency';
import { pluralize } from '../../../utils/string';
import { featureCost, meteredFeatureDisplayValue, pricingTiers } from '../../../utils/plan';

type MeteredFeature = ResourcePlansQuery['resource']['plan']['meteredFeatures']['edges'][0];

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

  const displayValue = meteredFeatureDisplayValue(numericDetails);
  return [displayValue.cost, displayValue.per ? <small>&nbsp;{displayValue.per}</small> : ''];
}

const MeteredFeature: FunctionalComponent<{ meteredFeature?: MeteredFeature }> = ({
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
