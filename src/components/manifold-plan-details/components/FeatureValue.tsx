import { FunctionalComponent } from '@stencil/core';
import { BooleanFeature } from './BooleanFeature';
import { StringFeature } from './StringFeature';
import { NumberFeature } from './NumberFeature';

interface FeatureValueProps {
  features: UserFeatures;
  feature: Catalog.ExpandedFeature;
  isExistingResource?: boolean;
  onChange: (e: CustomEvent) => void;
}
export const FeatureValue: FunctionalComponent<FeatureValueProps> = props => {
  let feature;
  switch (props.feature.type) {
    case 'boolean':
      feature = <BooleanFeature {...props} />;
      break;
    case 'number':
      feature = <NumberFeature {...props} />;
      break;
    case 'string':
      feature = <StringFeature {...props} />;
      break;
    default:
  }
  return <dd class="feature-value">{feature}</dd>;
};
