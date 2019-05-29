import resource from '../../spec/mock/cms-stage/resource.json';
import fromJSON from '../../spec/mock/fromJSON';

export const available = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = { loading: false, data: fromJSON(resource) };

  document.body.appendChild(status);
};

export const offline = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = { loading: false, data: undefined };

  document.body.appendChild(status);
};

export const resourceLoading = () => {
  const status = document.createElement('manifold-resource-status-view');
  status.resourceState = { loading: true, data: undefined };

  document.body.appendChild(status);
};
