import { UserFeatures } from 'types/UserFeatures';
import { Option } from 'types/Select';
import { Connection } from './connections';
import { $ } from './currency';

interface PlanCostOptions {
  planID: string;
  features: UserFeatures;
  init: RequestInit;
}

export const NO = 'No';
export const YES = 'Yes';
export const NUMBER_FEATURE_COIN = 10000000; // Numeric features are a ten-millionth of a cent, because floats stink

/**
 * Convert number feature costs to float cents (NOT DOLLARS)
 */
export function featureCost(number: number) {
  return number / NUMBER_FEATURE_COIN;
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
export function pricingTiers({
  numeric_details,
}: Catalog.FeatureValueDetails): { cost: number; limit: number; suffix: string }[] {
  if (!numeric_details) return [];
  const suffix = numeric_details.suffix || '';
  if (!Array.isArray(numeric_details.cost_ranges)) return [{ limit: -1, cost: 0, suffix }];

  return numeric_details.cost_ranges
    .sort((a, b) => {
      if (a.limit === -1) return 1;
      if (b.limit === -1) return -1;
      return (a.limit || 0) - (b.limit || 0);
    })
    .map(({ cost_multiple, limit }) => ({
      cost: featureCost(cost_multiple || 0),
      limit: limit || -1,
      suffix,
    }));
}

/**
 * User-friendly display for a measurable number feature value
 */
export function numberFeatureMeasurableDisplayValue(
  value: Catalog.FeatureValueDetails
): string | undefined {
  const { name, numeric_details } = value;
  if (!numeric_details) return undefined;

  // Feature unavailable
  if (!Array.isArray(numeric_details.cost_ranges) || numeric_details.cost_ranges.length === 0)
    return name.replace(/^No .*/, NO).replace(/^Yes/, YES);

  const suffix = numeric_details.suffix || '';

  // Flat cost
  if (numeric_details.cost_ranges.length === 1) {
    const [first] = numeric_details.cost_ranges;
    if (first.cost_multiple) {
      return `${$(featureCost(first.cost_multiple))} / ${suffix}`;
    }
    return 'Free';
  }

  // Multiple tiers
  // Sort in ascending limit order, but place -1 at the end
  const sortedTiers = pricingTiers(value);

  const withCommas = new Intl.NumberFormat().format;
  return sortedTiers
    .map(({ cost, limit }, index) => {
      const lowEnd = index === 0 ? numeric_details.min : sortedTiers[index - 1].limit;
      let highEnd = (limit && limit > 0 && limit) || '+';
      if (typeof highEnd === 'number') highEnd = `–${withCommas(highEnd - 1)}`;
      const spacedSuffix = suffix ? ` ${suffix}` : '';
      return `${withCommas(lowEnd || 0)}${highEnd}${spacedSuffix}: ${
        cost === 0 ? 'free' : $(cost)
      }`;
    })
    .join(' / ');
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
export function initialFeatures(features: Catalog.ExpandedFeature[]): UserFeatures {
  // We want to set _all_ features, not just customizable ones, to calculate cost
  return features.reduce((obj, feature) => {
    if (!feature.value) return obj;

    if (feature.type === 'boolean')
      return { ...obj, [feature.label]: booleanFeatureDefaultValue(feature.value) };
    if (feature.type === 'number')
      return { ...obj, [feature.label]: numberFeatureDefaultValue(feature.value) };
    if (feature.type === 'string')
      return { ...obj, [feature.label]: stringFeatureDefaultValue(feature.value) };

    return obj;
  }, {});
}

/**
 * Fetch cost from our API
 */
export function planCost(
  connection: Connection,
  { planID, features, init }: PlanCostOptions
): Promise<Gateway.Price> {
  return fetch(`${connection.gateway}/id/plan/${planID}/cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features }),
    ...init,
  }).then(response => response.json());
}
