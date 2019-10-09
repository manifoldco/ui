import { Option } from '../types/Select';
import { Catalog } from '../types/catalog';
import { Gateway } from '../types/gateway';
import { $ } from './currency';
import { pluralize } from './string';
import { RestFetch } from './restFetch';
import {
  Plan,
  PlanFixedFeatureConnection,
  RegionConnection,
  PlanMeteredFeatureConnection,
  PlanConfigurableFeatureConnection,
  PlanFeatureType,
  PlanMeteredFeature,
  PlanMeteredFeatureNumericDetails,
  PlanConfigurableFeatureEdge,
} from '../types/graphql';

interface PlanCostOptions {
  planID: string;
  features: Gateway.FeatureMap;
  init: RequestInit;
}

export interface PricingTier {
  cost: number;
  from: number;
  to: number;
  per: number;
  unit: string;
}

// numeric details constants
export const NUMBER_FEATURE_COIN = 10000000; // Numeric features are a ten-millionth of a cent, because floats stink
const SECONDS_IN_HOUR = 60 * 60;

// boolean feature display values
export const NO = 'No';
export const YES = 'Yes';

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

export function hasCustomizableFeatures(features: Catalog.ExpandedFeature[]): boolean {
  return (
    features.findIndex(
      ({ customizable }) => typeof customizable === 'boolean' && customizable === true
    ) !== -1
  );
}

/**
 * Determines whether plan has measurable features
 */

export function hasMeasurableFeatures(features: Catalog.ExpandedFeature[]): boolean {
  return (
    features.findIndex(
      ({ measurable }) => typeof measurable === 'boolean' && measurable === true
    ) !== -1
  );
}

/**
 * User-friendly display for price description (may be found on any feature type)
 */
export function featureDescription(value: Catalog.FeatureValueDetails): string | undefined {
  return value.price && value.price.description;
}

/**
 * Default data value for a boolean feature
 */
export function booleanFeatureDefaultValue(value: Catalog.FeatureValueDetails): boolean {
  return value.label === 'true';
}

/**
 * User-friendly display for a boolean feature value
 */
export function booleanFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  return value.label === 'true' ? YES : NO;
}

/**
 * Default data value for a string feature
 */
export function stringFeatureDefaultValue(value: Catalog.FeatureValueDetails): string {
  return value.label;
}

/**
 * User-friendly display for a string feature value
 */
export function stringFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  return value.name;
}

/**
 * Format dropdown options for string features
 */
export function stringFeatureOptions(values: Catalog.FeatureValueDetails[]): Option[] {
  return values.map(({ cost, label, name: optionName }) => ({
    label: `${optionName} (${cost ? $(cost) : 'Included'})`,
    value: label,
  }));
}

/**
 * Default data value for a number feature
 */
export function numberFeatureDefaultValue(value: Catalog.FeatureValueDetails): number {
  if (value.numeric_details && typeof value.numeric_details.min === 'number') {
    return value.numeric_details.min;
  }
  return 0;
}

/**
 * Calculate pricing tiers for metered features
 */
export function pricingTiers({ numeric_details }: Catalog.FeatureValueDetails): PricingTier[] {
  if (!numeric_details) {
    return [];
  }

  // Features can be really, really (really) cheap. Let’s make things easier.
  let per = 1;
  const unit = numeric_details.suffix || '';
  if (!Array.isArray(numeric_details.cost_ranges)) {
    return [{ from: 0, to: Infinity, cost: 0, unit, per }];
  }

  const cheapestNonZeroCost = numeric_details.cost_ranges.reduce((cost, tier) => {
    if (!tier.cost_multiple || tier.cost_multiple === 0) {
      return cost;
    }
    return tier.cost_multiple < cost ? tier.cost_multiple : cost;
  }, Infinity);

  if (cheapestNonZeroCost < NUMBER_FEATURE_COIN) {
    per = oneCent(cheapestNonZeroCost);
  }

  // Sort tiers, with -1 (Infinity) at the end
  const sorted = numeric_details.cost_ranges.sort((a, b) => {
    if (a.limit === -1) {
      return 1;
    }
    if (b.limit === -1) {
      return -1;
    }
    return (a.limit || 0) - (b.limit || 0);
  });

  return sorted.map(({ cost_multiple, limit }, i) => {
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
      const hours = 60 * 60;
      return {
        cost: (cost_multiple || 0) * hours,
        from: Math.round(from / hours),
        to: to === Infinity ? Infinity : Math.round(to / hours),
        unit: 'hour',
        per: 1,
      };
    }

    return {
      cost: cost_multiple || 0,
      from,
      to,
      unit,
      per,
    };
  });
}

/**
 * Calculate pricing tiers for GQL metered features
 */

export function pricingGqlTiers({
  costTiers,
  unit,
}: PlanMeteredFeatureNumericDetails): PricingTier[] {
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

/**
 * User-friendly display for a measurable number feature value
 */
export function numberFeatureMeasurableDisplayValue(
  value: Catalog.FeatureValueDetails
): string | undefined {
  const { name, numeric_details } = value;
  if (!numeric_details) {
    return undefined;
  }

  const withCommas = new Intl.NumberFormat().format;

  // Feature unavailable
  if (!Array.isArray(numeric_details.cost_ranges) || numeric_details.cost_ranges.length === 0) {
    return name.replace(/^No .*/, NO).replace(/^Yes/, YES);
  }

  const tiers = pricingTiers(value);

  // Flat cost
  if (tiers.length === 1) {
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

  return undefined;
}

/**
 * User-friendly display for a measurable number feature value
 */
export function meteredFeatureDisplayValue({ numericDetails }: PlanMeteredFeature): string {
  const withCommas = new Intl.NumberFormat().format;
  const tiers = pricingGqlTiers(numericDetails);

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
export function numberFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  const suffix = value.numeric_details && value.numeric_details.suffix;
  return Number.isNaN(Number(value.name))
    ? value.name
    : `${new Intl.NumberFormat('en-US').format(parseFloat(value.name))}${
        suffix ? ` ${suffix}` : ''
      }`;
}

/**
 * Collect all default data values for a feature set
 */
export function initialFeatures(features: Catalog.ExpandedFeature[]): Gateway.FeatureMap {
  // We want to set _all_ features, not just customizable ones, to calculate cost
  return features.reduce((obj, feature) => {
    if (!feature.value) {
      return obj;
    }

    if (feature.type === 'boolean') {
      return { ...obj, [feature.label]: booleanFeatureDefaultValue(feature.value) };
    }
    if (feature.type === 'number') {
      return { ...obj, [feature.label]: numberFeatureDefaultValue(feature.value) };
    }
    if (feature.type === 'string') {
      return { ...obj, [feature.label]: stringFeatureDefaultValue(feature.value) };
    }

    return obj;
  }, {});
}

/**
 * Get initial features for GraphQL features
 */

export function initialGqlFeatures(
  features: PlanConfigurableFeatureEdge[]
): { [key: string]: string | boolean | number } {
  return features.reduce((featureMap, feature) => {
    if (feature.node.type === PlanFeatureType.Number) {
      const { min } = feature.node.numericDetails || {};
      return { ...featureMap, [feature.node.label]: min };
    }
    const [firstOption] = feature.node.options || [];
    return {
      ...featureMap,
      [feature.node.label]: firstOption.displayValue,
    };
  }, {});
}

/**
 * Sort plans
 */
export function planSort(
  plans: Catalog.ExpandedPlan[],
  options?: { free?: boolean }
): Catalog.ExpandedPlan[] {
  // Clone array to prevent accidental mutation with sort()
  const sorted = [...plans].sort((a, b) => {
    // If comparing 2 free plans, they both cost 0 anyway so don’t reorder
    if (a.body.free === true && b.body.free === true) {
      return 0;
    }
    // Move free plan to beginning
    if (a.body.free === true || b.body.free === true) {
      return a.body.free === true ? -1 : 1;
    }
    // Move custom plan to end (but once at the end, sort by cost)
    if (
      (a.body.customizable === true || b.body.customizable === true) &&
      a.body.customizable !== b.body.customizable // if both custom, skip to cost sorting below
    ) {
      return a.body.customizable === true ? 1 : -1;
    }
    // By default, sort by cost
    return (a.body.defaultCost || a.body.cost) - (b.body.defaultCost || b.body.cost);
  });

  // TODO: remove when we have API-level filtering
  if (options && options.free === true) {
    return plans.filter(
      ({ body }) =>
        body.free === true || body.defaultCost === 0 || (!body.defaultCost && body.cost === 0)
    );
  }

  return sorted;
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

const convertFixedFeatureData = (
  features?: PlanFixedFeatureConnection | null | undefined
): Catalog.ExpandedFeature[] => {
  if (!features) {
    return [];
  }

  const newFeatures: Catalog.ExpandedFeature[] = features.edges.map(({ node: feature }) => {
    const value_string = feature.displayValue;
    let type: 'string' | 'number' | 'boolean' = 'string';

    if (value_string === 'true' || value_string === 'false') {
      type = 'boolean';
    }

    return {
      label: feature.label,
      name: feature.displayName,
      type,
      value: {
        label: type === 'string' ? feature.label : feature.displayValue,
        name: feature.displayValue,
      },
      value_string,
    };
  });

  return newFeatures;
};

const convertMeteredFeatureData = (
  features?: PlanMeteredFeatureConnection | null | undefined
): Catalog.ExpandedFeature[] => {
  if (!features) {
    return [];
  }

  const newFeatures: Catalog.ExpandedFeature[] = features.edges.map(({ node: feature }) => {
    return {
      label: feature.label,
      name: feature.displayName,
      measurable: true,
      type: 'number',
      value: {
        label: feature.label,
        name: feature.displayName,
        numeric_details: {
          ...(feature.numericDetails.costTiers && feature.numericDetails.costTiers.length > 0
            ? { increment: 1 }
            : {}),
          suffix: feature.numericDetails.unit,
          cost_ranges: feature.numericDetails.costTiers
            ? feature.numericDetails.costTiers.map(({ cost, limit }) => ({
                cost_multiple: cost,
                limit,
              }))
            : [],
        },
      },
      value_string: feature.displayName,
    };
  });

  return newFeatures;
};

const convertConfigurableFeatureData = (
  features?: PlanConfigurableFeatureConnection | null | undefined
): Catalog.ExpandedFeature[] => {
  if (!features) {
    return [];
  }

  const newFeatures: Catalog.ExpandedFeature[] = features.edges.map(({ node: feature }) => {
    let type: 'boolean' | 'string' | 'number' = 'string';
    if (feature.type === PlanFeatureType.Boolean) {
      type = 'boolean';
    }
    if (feature.type === PlanFeatureType.Number) {
      type = 'number';
    }

    const [firstOption] = feature.options || [];

    const value =
      feature.type === PlanFeatureType.Number
        ? {
            label: feature.label,
            name: feature.displayName,
            numeric_details: feature.numericDetails
              ? {
                  max: feature.numericDetails.max,
                  min: feature.numericDetails.min,
                  increment: feature.numericDetails.increment || 1,
                  suffix: feature.numericDetails.unit,
                  cost_ranges: feature.numericDetails.costTiers
                    ? feature.numericDetails.costTiers.map(({ cost, limit }) => ({
                        cost_multiple: cost,
                        limit,
                      }))
                    : [],
                }
              : undefined,
          }
        : {
            label: firstOption.label,
            name: firstOption.displayValue,
          };

    return {
      customizable: true,
      label: feature.label,
      name: feature.displayName,
      type,
      value,
      values: feature.options
        ? feature.options.map(option => ({
            label: option.label,
            name: option.displayValue,
          }))
        : [],
      value_string: firstOption ? firstOption.displayValue : feature.displayName,
    };
  });

  return newFeatures;
};

const convertPlanFeaturesData = (plan: Plan) => {
  if (plan.configurableFeatures) {
    return plan.configurableFeatures.edges.map(({ node }) => {
      const [firstOption] = node.options || [];
      return {
        feature: node.label,
        value: node.numericDetails
          ? `${node.numericDetails.min} ${node.numericDetails.unit}`
          : firstOption.label,
      };
    });
  }

  return [];
};

const convertRegionData = (regions: RegionConnection | null | undefined): string[] =>
  regions ? regions.edges.map(region => region.node.id) : [];

export const convertPlanData = (plan: Plan): Catalog.ExpandedPlan => ({
  id: plan.id,
  type: 'plan',
  version: 1,
  body: {
    cost: plan.cost,
    features: convertPlanFeaturesData(plan),
    label: plan.label,
    name: plan.displayName,
    product_id: (plan.product && plan.product.id) || '',
    provider_id: (plan.product && plan.product.provider && plan.product.provider.id) || '',
    regions: convertRegionData(plan.regions),
    state: plan.state && plan.state.toLocaleLowerCase(),
    expanded_features: [
      ...convertFixedFeatureData(plan.fixedFeatures),
      ...convertMeteredFeatureData(plan.meteredFeatures),
      ...convertConfigurableFeatureData(plan.configurableFeatures),
    ],
    ...(plan.configurableFeatures && plan.configurableFeatures.edges.length > 0
      ? { customizable: true }
      : {}),
    free: plan.free,
  },
});
