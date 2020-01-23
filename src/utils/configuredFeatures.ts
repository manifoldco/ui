import { Gateway } from 'types/gateway';

export interface ConfiguredFeatureGraphQL {
  node: {
    label: string;
    booleanValue?: boolean;
    numberValue?: number;
    stringValue?: string;
  };
}

const isDefined = (x: unknown) => typeof x !== 'undefined';

export const formatGatewayFeatures = (
  configuredFeatures?: ConfiguredFeatureGraphQL[]
): Gateway.FeatureMap => {
  if (!configuredFeatures || configuredFeatures?.length === 0) {
    return {};
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
    : {};
};
