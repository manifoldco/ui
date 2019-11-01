export const noCredsDefault = () => {
  const el = document.createElement('manifold-no-credentials');

  const ssoButton = document.createElement('manifold-resource-sso');
  ssoButton.slot = 'sso-button';
  ssoButton.appendChild(document.createTextNode('SSO into Dashboard'));

  el.appendChild(ssoButton);

  document.body.appendChild(el);

  return el.componentOnReady();
};

