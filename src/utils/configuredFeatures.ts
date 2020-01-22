import { Gateway } from 'types/gateway';

export interface ConfiguredFeatureGraphQL {
  node: {
    label: string;
    booleanValue?: boolean;
    numberValue?: number;
    stringValue?: string;
  };
}

export interface ConfiguredFeature {
  label: string;
  value?: string;
}

const isDefined = (x: unknown) => typeof x !== 'undefined';

export const formatConfiguredFeatures = (
  configuredFeatures: ConfiguredFeatureGraphQL[]
): ConfiguredFeature[] =>
  configuredFeatures.map(({ node: { label, ...f } }) => ({
    label,
    ...(isDefined(f.booleanValue) ? { value: `${f.booleanValue}` } : {}),
    ...(isDefined(f.numberValue) ? { value: `${f.numberValue}` } : {}),
    ...(isDefined(f.stringValue) ? { value: f.stringValue } : {}),
  }));

export const formatGatewayFeatures = (
  configuredFeatures?: ConfiguredFeatureGraphQL[]
): Gateway.FeatureMap | undefined => {
  if (!configuredFeatures || configuredFeatures?.length === 0) {
    return undefined;
  }
  return Array.isArray(configuredFeatures)
    ? configuredFeatures.reduce(
        (featureMap, { node: f }) => ({
          ...featureMap,
          ...(isDefined(f.booleanValue) ? { [f.label]: f.booleanValue } : {}),
          ...(isDefined(f.numberValue) ? { [f.label]: f.numberValue } : {}),
          ...(isDefined(f.stringValue) ? { [f.label]: f.stringValue } : {}),
        }),
        {}
      )
    : undefined;
};
