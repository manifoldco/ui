import { text, radios } from '@storybook/addon-knobs';

// Creates a fake token provider and manifold connection that adds the api token from localstorage
// with an expiriy date a week from when it is created. 6.04e8 is a week in milliseconds.
export const manifoldConnectionDecorator = storyFn => {
  const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');
  const options = { Production: 'prod', Staging: 'stage' };
  const env = radios('env', options, 'prod');
  localStorage.setItem('manifold_api_token', token); // update localStorage to persist

  // grab user ID from Manifold (we need this in other stories)
  if (token && !localStorage.getItem('manifold_user_id')) {
    fetch('https://api.identity.manifold.co/v1/self', {
      headers: { authorization: `Bearer ${token}` },
    })
      .then(data => data.json())
      .then(({ id }) => {
        localStorage.setItem('manifold_user_id', id);
      });
  }

  return `
  <manifold-connection env="${env}">
    <manifold-auth-token token="${token}|${new Date(Date.now() + 6.04e8).getTime()}"/>
    ${storyFn()}
  </manifold-connection>
`;
};
