import { Resource } from '../../types/graphql';
import { resource } from '../../spec/mock/graphql';

export const detailsLoaded = () => {
  const details = document.createElement('manifold-resource-details');
  details.gqlData = resource as Resource;
  details.loading = false;

  document.body.appendChild(details);

  return details.componentOnReady();
};

export const skeleton = () => {
  const details = document.createElement('manifold-resource-details');

  document.body.appendChild(details);

  return details.componentOnReady();
};
