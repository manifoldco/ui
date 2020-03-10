import resource from '../../spec/mock/elegant-cms/resource';
import { ResourceWithOwnerQuery } from '../../types/graphql';

export const loading = () => {
  const status = document.createElement('manifold-resource-status');
  status.loading = true;

  document.body.appendChild(status);
  return status.componentOnReady();
};

export const availableResource = async () => {
  const status = document.createElement('manifold-resource-status');

  document.body.appendChild(status);
  await status.componentOnReady();
  status.gqlData = resource as ResourceWithOwnerQuery['resource'];
  status.loading = false;

  return status.componentOnReady();
};
