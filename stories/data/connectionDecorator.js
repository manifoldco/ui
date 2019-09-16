import { text } from '@storybook/addon-knobs';

// Creates a fake token provider and manifold connection that adds the api token from localstorage
// with an expiriy date a week from when it is created. 6.04e8 is a week in milliseconds.
export const manifoldConnectionDecorator = storyFn => {
  const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');
  localStorage.setItem('manifold_api_token', token); // update localStorage to persist
  return `
  <manifold-connection env="stage">
    <manifold-auth-token token="${token}|${new Date(Date.now() + 6.04e8).getTime()}"/>
    ${storyFn()}
  </manifold-connection>
`;
};
