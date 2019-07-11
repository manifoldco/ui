export const available = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'available';

  document.body.appendChild(status);

  return status.componentOnReady();
};

export const availableSmall = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = 'available';
  status.size = 'small';

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
