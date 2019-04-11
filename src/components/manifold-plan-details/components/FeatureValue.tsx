import { FunctionalComponent } from '@stencil/core';
import { UserFeatures } from 'types/UserFeatures';
import { BooleanFeature } from './BooleanFeature';
import { StringFeature } from './StringFeature';
import { NumberFeature } from './NumberFeature';

interface FeatureValueProps {
  features: UserFeatures;
  feature: Catalog.ExpandedFeature;
  isExistingResource?: boolean;
  onChange: (e: CustomEvent) => any;
}
export const FeatureValue: FunctionalComponent<FeatureValueProps> = props => {
  let feature;
  switch (props.feature.type) {
    case 'boolean':
      feature = <BooleanFeature {...props} />;
      break;
    case 'string':
      feature = <StringFeature {...props} />;
      break;
    case 'number':
      feature = <NumberFeature {...props} />;
      break;
  }
  return <dd class="feature-value">{feature}</dd>;
};
