import { resource } from '../../spec/mock/graphql';

export const skeleton = () => {
  const resourcePlan = document.createElement('manifold-resource-plan');
  resourcePlan.loading = true;

  document.body.appendChild(resourcePlan);
  return resourcePlan.componentOnReady();
};

export const loadedResource = async () => {
  const resourcePlan = document.createElement('manifold-resource-plan');
  await resourcePlan.componentOnReady();

  resourcePlan.gqlData = resource;
  resourcePlan.loading = false;

  document.body.appendChild(resourcePlan);
  return resourcePlan.componentOnReady();
};
