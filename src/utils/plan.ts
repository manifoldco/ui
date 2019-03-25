import { UserFeatures } from 'types/UserFeatures';
import { Option } from 'types/Select';
import { Connection } from './connections';
import { $ } from './currency';
import { singularize } from './string';

interface PlanCostOptions {
  planID: string;
  features: UserFeatures;
  init: RequestInit;
}

export const NO = 'No';
export const YES = 'Yes';
export const NUMBER_FEATURE_COIN = 10000000; // Numeric features are a ten-millionth of a cent, because floats stink

export function featureCost(number: number) {
  return number / NUMBER_FEATURE_COIN;
}

export function booleanFeatureDefaultValue(value: Catalog.FeatureValueDetails): boolean {
  return value.label === 'true';
}

export function booleanFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  return value.label === 'true' ? YES : NO;
}

export function stringFeatureDefaultValue(value: Catalog.FeatureValueDetails): string {
  return value.label;
}

export function stringFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  return value.name;
}

export function stringFeatureOptions(values: Catalog.FeatureValueDetails[]): Option[] {
  return values.map(({ cost, label, name: optionName }) => ({
    label: `${optionName} (${cost ? $(cost) : 'Included'})`,
    value: label,
  }));
}

export function numberFeatureDefaultValue(value: Catalog.FeatureValueDetails): number {
  if (value.numeric_details && typeof value.numeric_details.min === 'number') {
    return value.numeric_details.min;
  }
  return 0;
}

export function numberFeatureMeasurableDisplayValue({
  name,
  numeric_details,
}: Catalog.FeatureValueDetails): string | undefined {
  if (!numeric_details || !Array.isArray(numeric_details.cost_ranges)) return undefined;

  // Feature unavailable
  if (numeric_details.cost_ranges.length === 0)
    return name.replace(/^No .*/, NO).replace(/^Yes/, YES);

  const suffix = (numeric_details.suffix && numeric_details.suffix.toLowerCase()) || '';
  const sortedCosts = numeric_details.cost_ranges
    .filter((feature: any) => feature.cost_multiple > 0)
    .sort(
      (a: { cost_multiple: number }, b: { cost_multiple: number }) =>
        a.cost_multiple - b.cost_multiple
    );

  // Free
  if (!sortedCosts[0].cost_multiple) return 'free';

  // Flat cost
  const lowEnd = featureCost(sortedCosts[0].cost_multiple);
  const freeTier = numeric_details.cost_ranges.find(
    (feature: any) => !feature.cost_multiple || feature.cost_multiple === 0
  );
  const freeText = freeTier ? ` (free until ${freeTier.limit} ${suffix})` : '';
  if (sortedCosts.length === 1) return `${lowEnd} / ${singularize(suffix)}${freeText}`;

  // Multiple tiers
  const highEnd = featureCost(sortedCosts[sortedCosts.length - 1].cost_multiple || 0);
  return `${lowEnd} - ${highEnd} / ${singularize(suffix)}${freeText}`;
}

export function numberFeatureDisplayValue(value: Catalog.FeatureValueDetails): string {
  return Number.isNaN(Number(value.name))
    ? value.name
    : new Intl.NumberFormat('en-US').format(parseFloat(value.name));
}

export function numberFeatureDescription(value: Catalog.FeatureValueDetails): string | undefined {
  return value.price && value.price.description;
}

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
