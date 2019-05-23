import resource from '../../spec/mock/cms-stage/resource.json';
import credentials from '../../spec/mock/cms-stage/credentials.json';
import fromJSON from '../../spec/mock/fromJSON';

export const credsHidden = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.resourceState = { loading: false, resource: fromJSON(resource) };

  document.body.appendChild(creds);
};

export const credsShown = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.resourceState = { loading: false, resource: fromJSON(resource) };
  creds.credentials = fromJSON(credentials);

  document.body.appendChild(creds);
};

export const resourceLoading = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.resourceState = { loading: true, resource: undefined };

  document.body.appendChild(creds);
};
