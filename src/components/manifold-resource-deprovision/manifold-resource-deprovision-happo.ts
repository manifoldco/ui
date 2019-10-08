import { resource } from '../../spec/mock/graphql';

export const skeleton = () => {
  const resourceDeprovision = document.createElement('manifold-resource-deprovision');
  document.body.appendChild(resourceDeprovision);
  return resourceDeprovision.componentOnReady();
};

export const loadedResource = async () => {
  const resourceDeprovision = document.createElement('manifold-resource-deprovision');
  document.body.appendChild(resourceDeprovision);
  await resourceDeprovision.componentOnReady();

  resourceDeprovision.gqlData = resource;
  resourceDeprovision.loading = false;

  return resourceDeprovision.componentOnReady();
};
