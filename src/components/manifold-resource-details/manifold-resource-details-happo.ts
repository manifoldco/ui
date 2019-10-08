import { resource } from '../../spec/mock/graphql';

export const detailsLoaded = async () => {
  const details = document.createElement('manifold-resource-details');

  document.body.appendChild(details);
  await details.componentOnReady();

  details.gqlData = resource;
  details.loading = false;

  return details.componentOnReady();
};

export const skeleton = () => {
  const details = document.createElement('manifold-resource-details');

  document.body.appendChild(details);
  details.loading = true;

  return details.componentOnReady();
};
