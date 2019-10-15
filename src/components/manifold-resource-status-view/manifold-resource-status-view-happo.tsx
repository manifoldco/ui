export const available = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'AVAILABLE';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const availableSmall = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'AVAILABLE';
  status.size = 'small';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const availableXSmall = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'AVAILABLE';
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
  status.resourceState = 'CREATING';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const errorCreating = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'ERROR_CREATING';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const deleted = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'DELETED';

  document.body.appendChild(status);

  return status.componentOnReady();
};
