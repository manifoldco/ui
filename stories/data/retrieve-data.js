// TODO(dom): we can get this data from graphql now, so why not do it?
import productLabels from './product-labels';
import productLabelsStage from './product-labels-stage';
import productLabelsLocal from './product-labels-local';
import planIds from './plan-ids';
import planIDsStage from './plan-ids-stage';
import planIDsLocal from './plan-ids-local';

export const getProductLabels = env => {
  switch (env) {
    case 'local':
      return productLabelsLocal;
    case 'stage':
      return productLabelsStage;
    default:
      return productLabels;
  }
};

export const getPlanIds = env => {
  switch (env) {
    case 'local':
      return planIDsLocal;
    case 'stage':
      return planIDsStage;
    default:
      return planIds;
  }
};
