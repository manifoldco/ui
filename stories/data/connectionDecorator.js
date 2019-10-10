import { text, radios } from '@storybook/addon-knobs';

// Creates a fake token provider and manifold connection that adds the api token from localstorage.
export const manifoldConnectionDecorator = storyFn => {
  const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');
  const options = { Production: 'prod', Staging: 'stage' };
  const env = radios('env', options, localStorage.getItem('manifold_auth_env') || 'prod');
  const authType = radios(
    'authType',
    { Manual: 'manual', OAuth: 'oauth' },
    localStorage.getItem('manifold_auth_type') || 'manual'
  );
  localStorage.setItem('manifold_auth_env', env);
  localStorage.setItem('manifold_auth_type', authType);
  localStorage.setItem('manifold_api_token', token); // update localStorage to persist

  return `
  <manifold-connection env="${env}">
    <manifold-auth-token token="${token}" auth-type="${authType}"></manifold-auth-token>
    ${storyFn()}
  </manifold-connection>
`;
};
