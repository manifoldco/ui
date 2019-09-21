import { Option } from '../types/Select';
import { Catalog } from '../types/catalog';
import { Gateway } from '../types/gateway';
import { $ } from './currency';
import { pluralize } from './string';
import { RestFetch } from './restFetch';
import {
  Plan,
  PlanMeteredFeature,
  PlanMeteredFeatureNumericDetails,
  PlanFixedFeature,
  PlanConfigurableFeature,
} from '../types/graphql';

// Numeric details constants
export const NUMBER_FEATURE_COIN = 10000000; // Numeric features are a ten-millionth of a cent, because floats stink
const SECONDS_IN_HOUR = 60 * 60;

// Boolean feature display values
export const NO = 'No';
export const YES = 'Yes';

// Configurable feature types
export const BOOLEAN = 'BOOLEAN';
export const NUMBER = 'NUMBER';
export const STRING = 'STRING';

/**
 * Convert number feature costs to float cents (NOT DOLLARS)
 */
export function featureCost(number: number) {
  return number / NUMBER_FEATURE_COIN;
}

/**
 * For really, really, really cheap features that would normally display something awful like
 * “$0.000002345 / unit”, this figures out a sane number to display something like “$0.02 per 4,000 units”.
 */
export function oneCent(number: number) {
  const min = Math.ceil(NUMBER_FEATURE_COIN / number);
  // If sorta tiny round to nearest thousand
  if (min < 1000) {
    return Math.ceil(min / 1000) * 1000;
  }
  // Otherwise, round to nearest hundred
  return Math.ceil(min / 100) * 100;
}

/**
 * Determines whether plan has custom features
 */

// export function hasCustomizableFeatures(features: Catalog.ExpandedFeature[]): boolean {
//   return (
//     features.findIndex(
//       ({ customizable }) => typeof customizable === 'boolean' && customizable === true
//     ) !== -1
//   );
// }

/**
 * Determines whether plan has measurable features
 */

// export function hasMeasurableFeatures(features: Catalog.ExpandedFeature[]): boolean {
//   return (
//     features.findIndex(
//       ({ measurable }) => typeof measurable === 'boolean' && measurable === true
//     ) !== -1
//   );
// }

/**
 * User-friendly display for price description (may be found on any feature type)
 */
export function featureDescription(value: Catalog.FeatureValueDetails): string | undefined {
  return value.price && value.price.description;
}

/**
 * Default data value for a boolean feature
 */
export function booleanFeatureDefaultValue(feature: PlanConfigurableFeature): boolean {
  return feature.label === 'true';
}

/**
 * User-friendly display for a boolean feature value
 */
export function fixedFeatureDisplayValue({ displayValue }: PlanFixedFeature): string {
  if (displayValue === 'true') {
    return YES;
  }
  if (displayValue === 'false') {
    return NO;
  }
  return displayValue;
}

/**
 * Default data value for a string feature
 */
// export function stringFeatureDefaultValue(value: Catalog.FeatureValueDetails): string {
//   return value.label;
// }

/**
 * User-friendly display for a string feature value
 */
// export function stringFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
//   return value.name;
// }

/**
 * Format dropdown options for string features
 */
export function stringFeatureOptions(options: PlanFixedFeature[]): Option[] {
  return options.map(({ displayName, displayValue }) => ({
    // ! feature cost not in API yet. Add this line back once it is available
    label: displayName, // `${displayName} (${cost ? $(cost) : 'Included'})`,
    value: displayValue,
  }));
}

/**
 * Default data value for a number feature
 */
export function numberFeatureDefaultValue({ numericDetails }: PlanConfigurableFeature): number {
  if (numericDetails && typeof numericDetails.min === 'number') {
    return numericDetails.min;
  }
  return 0;
}

export interface PricingTier {
  cost: number;
  from: number;
  to: number;
  per: number;
  unit: string;
}

/**
 * Calculate pricing tiers for metered features
 */
export function pricingTiers({ costTiers, unit }: PlanMeteredFeatureNumericDetails): PricingTier[] {
  if (!costTiers) {
    return [];
  }

  // Features can be really, really (really) cheap. Let’s make things easier.
  let per = 1;
  if (costTiers.length === 0) {
    return [{ from: 0, to: Infinity, cost: 0, unit, per }];
  }

  const cheapestNonZeroCost = costTiers.reduce((totalCost, tier) => {
    if (!tier.cost || tier.cost === 0) {
      return totalCost;
    }
    return tier.cost < totalCost ? tier.cost : totalCost;
  }, Infinity);

  if (cheapestNonZeroCost < NUMBER_FEATURE_COIN) {
    per = oneCent(cheapestNonZeroCost);
  }

  // Sort tiers, with -1 (Infinity) at the end
  const sorted = costTiers.sort((a, b) => {
    if (a.limit === -1) {
      return 1;
    }
    if (b.limit === -1) {
      return -1;
    }
    return (a.limit || 0) - (b.limit || 0);
  });

  return sorted.map(({ cost = 0, limit }, i) => {
    // Each tier starts at previous + 1 (not other way around)
    let from = 0;
    const lastTier = sorted[i - 1];
    if (lastTier && typeof lastTier.limit === 'number') {
      from = lastTier.limit + 1;
    }

    // Use Infinity rather than -1
    let to = typeof limit === 'number' ? limit : Infinity;
    if (to === -1) {
      to = Infinity;
    }

    // Special case: convert seconds for users
    if (unit.toLowerCase() === 'seconds') {
      return {
        cost: cost * SECONDS_IN_HOUR,
        from: Math.round(from / SECONDS_IN_HOUR),
        to: to === Infinity ? Infinity : Math.round(to / SECONDS_IN_HOUR),
        unit: 'hour',
        per: 1,
      };
    }

    return { cost, from, to, unit, per };
  });
}

const withCommas = new Intl.NumberFormat().format;

/**
 * User-friendly display for a measurable number feature value
 */
export function meteredFeatureDisplayValue({ numericDetails }: PlanMeteredFeature): string {
  const tiers = pricingTiers(numericDetails);

  // Flat cost
  const [{ cost, unit, per }] = tiers;

  if (cost === 0) {
    return 'Free';
  }

  // If features are really really cheap, let’s make it more readable
  if (per > 1) {
    return `${$(featureCost(cost * per))} per ${withCommas(per)} ${pluralize(unit)}`;
  }

  return `${$(featureCost(cost))} / ${unit}`;
}

/**
 * User-friendly display for a non-measurable number feature value
 */
// export function numberFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
//   const suffix = value.numeric_details && value.numeric_details.suffix;
//   return Number.isNaN(Number(value.name))
//     ? value.name
//     : `${new Intl.NumberFormat('en-US').format(parseFloat(value.name))}${
//         suffix ? ` ${suffix}` : ''
//       }`;
// }

/**
 * Collect all default data values for a feature set
 */
export function initialFeatures(plan: Plan): Gateway.FeatureMap {
  // We want to set _all_ features, not just customizable ones, to calculate cost
  const features: Gateway.FeatureMap = {};

  if (plan.fixedFeatures) {
    plan.fixedFeatures.edges.forEach(({ node: feature }) => {
      features[feature.label] = feature.displayValue;
    });
  }

  if (plan.meteredFeatures) {
    plan.meteredFeatures.edges.forEach(({ node: feature }) => {
      const { costTiers } = feature.numericDetails;
      features[feature.label] = costTiers && costTiers.length > 0 && costTiers[0].cost;
    });
  }

  if (plan.configurableFeatures) {
    plan.configurableFeatures.edges.forEach(({ node: feature }) => {
      switch (feature.type) {
        case BOOLEAN:
        case STRING:
          features[feature.label] = feature.options && feature.options[0].displayValue;
          break;
        case NUMBER:
          features[feature.label] = feature.numericDetails && feature.numericDetails.min;
          break;
        default:
          break;
      }
    });
  }

  return features;
}

/**
 * Sort plans
 */
// export function planSort(
//   plans: Catalog.ExpandedPlan[],
//   options?: { free?: boolean }
// ): Catalog.ExpandedPlan[] {
//   // Clone array to prevent accidental mutation with sort()
//   const sorted = [...plans].sort((a, b) => {
//     // If comparing 2 free plans, they both cost 0 anyway so don’t reorder
//     if (a.body.free === true && b.body.free === true) {
//       return 0;
//     }
//     // Move free plan to beginning
//     if (a.body.free === true || b.body.free === true) {
//       return a.body.free === true ? -1 : 1;
//     }
//     // Move custom plan to end (but once at the end, sort by cost)
//     if (
//       (a.body.customizable === true || b.body.customizable === true) &&
//       a.body.customizable !== b.body.customizable // if both custom, skip to cost sorting below
//     ) {
//       return a.body.customizable === true ? 1 : -1;
//     }
//     // By default, sort by cost
//     return (a.body.defaultCost || a.body.cost) - (b.body.defaultCost || b.body.cost);
//   });

//   // TODO: remove when we have API-level filtering
//   if (options && options.free === true) {
//     return plans.filter(
//       ({ body }) =>
//         body.free === true || body.defaultCost === 0 || (!body.defaultCost && body.cost === 0)
//     );
//   }

//   return sorted;
// }

interface PlanCostOptions {
  planID: string;
  features: Gateway.FeatureMap;
  init: RequestInit;
}

/**
 * Fetch cost from our API
 */
export function planCost(restFetch: RestFetch, { planID, features, init }: PlanCostOptions) {
  return restFetch<Gateway.Price>({
    service: 'gateway',
    endpoint: `/id/plan/${planID}/cost`,
    body: { features },
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      ...init,
    },
  });
}
