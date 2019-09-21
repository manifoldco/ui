// import { h, FunctionalComponent } from '@stencil/core';
// import { check } from '@manifoldco/icons';
// import {
//   featureCost,
//   numberFeatureDefaultValue,
//   numberFeatureDisplayValue,
//   numberFeatureMeasurableDisplayValue,
//   pricingTiers,
// } from '../../../utils/plan';
// import { $ } from '../../../utils/currency';
// import { pluralize } from '../../../utils/string';
// import { Catalog } from '../../../types/catalog';
// import { Gateway } from '../../../types/gateway';
// import { LockedFeature } from './LockedFeature';
// import { PlanMeteredFeature } from 'types/graphql';

// interface NumberFeatureProps {
//   features: Gateway.FeatureMap;
//   feature: PlanMeteredFeature;
//   isExistingResource?: boolean;
//   onChange: (e: CustomEvent) => void;
// }

// export const NumberFeature: FunctionalComponent<NumberFeatureProps> = ({
//   features,
//   feature,
//   isExistingResource,
//   onChange,
// }) => {
//   if (!feature) {
//     return '';
//   }

//   const withCommas = new Intl.NumberFormat().format;

// measurable features
// if (feature.measurable) {
//   const tiers = pricingTiers(feature.value);
//   if (tiers.length > 1) {
//     const [{ suffix, per }] = tiers;
//     return (
//       <table class="feature-table">
//         <tbody>
//           {tiers.map(({ from, to, cost }) => {
//             const unitDisplay = per === 1 ? ` / ${suffix}` : ` per ${withCommas(per)}`;

//             return (
//               <tr>
//                 <td>
//                   {withCommas(from)}
//                   {to === Infinity ? '+' : ` – ${withCommas(to)}`}
//                   {` ${pluralize(suffix)}`}
//                 </td>
//                 <td>{cost === 0 ? 'Free' : `${$(featureCost(cost * per))}${unitDisplay}`}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   }
// }

//   const displayValue = feature.measurable
//     ? numberFeatureMeasurableDisplayValue(feature.value)
//     : numberFeatureDisplayValue(feature.value);

//   // standard feature
//   if (!feature.customizable) {
//     return (
//       <span class="value" data-value={displayValue}>
//         <manifold-icon class="icon" icon={check} marginRight />
//         {displayValue || ''}
//       </span>
//     );
//   }

//   // locked feature
//   const isLocked = !feature.upgradable && !feature.downgradable;
//   if (isExistingResource && isLocked) {
//     return <LockedFeature>{displayValue}</LockedFeature>;
//   }

//   if (!feature.value.numeric_details) {
//     return '';
//   }

//   // customizable feature
//   const value =
//     typeof features[feature.label] === 'number'
//       ? (features[feature.label] as number)
//       : numberFeatureDefaultValue(feature.value);

//   return (
//     <manifold-number-input
//       aria-label={feature.displayName}
//       increment={feature.numericDetails.}
//       max={feature.value.numeric_details.max}
//       min={feature.value.numeric_details.min}
//       name={feature.label}
//       onUpdateValue={onChange}
//       suffix={feature.value.numeric_details.suffix}
//       value={value}
//       decrement-disabled-label="This feature is not downgradable"
//       increment-disabled-label="This feature is not upgradable"
//     />
//   );
// };
