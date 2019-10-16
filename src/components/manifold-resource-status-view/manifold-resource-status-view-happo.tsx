import { ResourceStatusLabel } from '../../types/graphql';

export const available = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.Available;

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const availableSmall = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.Available;
  status.size = 'small';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const availableXSmall = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.Available;
  status.size = 'xsmall';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const offline = () => {
  const status = document.createElement('manifold-resource-status-view');

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const resourceLoading = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.loading = true;

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const creating = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.Creating;

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const errorCreating = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.ErrorCreating;

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const deleted = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = ResourceStatusLabel.Deleted;

  document.body.appendChild(status);

  return status.componentOnReady();
};
