import credentials from '../../spec/mock/cms-stage/credentials.json';
import fromJSON from '../../spec/mock/fromJSON';

export const credsHidden = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.resourceName = 'test';

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsShown = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.resourceName = 'test';
  creds.credentials = fromJSON(credentials);

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const resourceLoading = () => {
  const creds = document.createElement('manifold-resource-credentials-view');
  creds.loading = true;

  document.body.appendChild(creds);

  return creds.componentOnReady();
};
