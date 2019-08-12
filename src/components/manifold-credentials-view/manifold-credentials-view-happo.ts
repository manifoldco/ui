import credentials from '../../spec/mock/cms-stage/credentials.json';
import fromJSON from '../../spec/mock/fromJSON';
import { buttonColors } from '../manifold-button/manifold-button';

export const credsHidden = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.resourceLabel = 'test';

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsShown = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.resourceLabel = 'test';
  creds.credentials = fromJSON(credentials);

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const resourceLoading = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.loading = true;

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsHiddenWithCustomColor = () => {
  const container = document.createElement('div');
  const promises = Promise.all(
    ['black', 'gray', 'orange', 'pink', 'white'].map(color => {
      const creds = document.createElement('manifold-credentials-view');
      creds.resourceLabel = 'test';
      creds.showButtonColor = color as buttonColors;

      container.appendChild(creds);

      return creds.componentOnReady();
    })
  );

  document.body.appendChild(container);

  return promises;
};

export const credsShownWithCustomColor = () => {
  const container = document.createElement('div');
  const promises = Promise.all(
    ['black', 'gray', 'orange', 'pink', 'white'].map(color => {
      const creds = document.createElement('manifold-credentials-view');
      creds.resourceLabel = 'test';
      creds.credentials = fromJSON(credentials);
      creds.hideButtonColor = color as buttonColors;

      container.appendChild(creds);

      return creds.componentOnReady();
    })
  );

  document.body.appendChild(container);

  return promises;
};
