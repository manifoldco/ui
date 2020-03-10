import resource from '../../spec/mock/elegant-cms/resource';
import { ResourceWithOwnerQuery } from '../../types/graphql';

export const skeleton = () => {
  const resourcePlan = document.createElement('manifold-resource-plan');
  resourcePlan.loading = true;

  document.body.appendChild(resourcePlan);
  return resourcePlan.componentOnReady();
};

export const loadedResource = async () => {
  const resourcePlan = document.createElement('manifold-resource-plan');

  document.body.appendChild(resourcePlan);
  await resourcePlan.componentOnReady();
  resourcePlan.gqlData = resource as ResourceWithOwnerQuery['resource'];
  resourcePlan.loading = false;

  return resourcePlan.componentOnReady();
};
