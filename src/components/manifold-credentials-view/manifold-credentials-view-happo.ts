import credentials from '../../spec/mock/elegant-cms/credentials';

export const credsHidden = () => {
  const creds = document.createElement('manifold-credentials-view');

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsShown = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.credentials = credentials;

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const resourceLoading = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.loading = true;

  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsHiddenWithCustomButton = () => {
  const creds = document.createElement('manifold-credentials-view');

  const button = document.createElement('manifold-button');
  button.color = 'orange';
  button.title = 'Show credentials';
  button.appendChild(document.createTextNode('Show credentials'));

  const container = document.createElement('div');
  container.slot = 'show-button';
  container.appendChild(button);

  creds.appendChild(container);
  document.body.appendChild(creds);

  return creds.componentOnReady();
};

export const credsShownWithCustomButton = () => {
  const creds = document.createElement('manifold-credentials-view');
  creds.credentials = credentials;

  const button = document.createElement('manifold-button');
  button.color = 'orange';
  button.title = 'Hide credentials';
  button.appendChild(document.createTextNode('Show credentials'));

  const container = document.createElement('div');
  container.slot = 'hide-button';
  container.appendChild(button);

  creds.appendChild(container);
  document.body.appendChild(creds);

  return creds.componentOnReady();
};
