import { text, radios } from '@storybook/addon-knobs';
import { gql } from '@manifoldco/gql-zero';

// Creates a fake token provider and manifold connection that adds the api token from localstorage
// with an expiriy date a week from when it is created. 6.04e8 is a week in milliseconds.
export const manifoldConnectionDecorator = storyFn => {
  const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');
  const options = { Production: 'prod', Staging: 'stage' };
  const env = radios('env', options, 'prod');
  localStorage.setItem('manifold_api_token', token); // update localStorage to persist

  // grab user ID from Manifold (we need this in other stories)
  if (token && !localStorage.getItem('manifold_user_id')) {
    fetch('https://api.manifold.co/graphql', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query GET_PROFILE_ID {
            profile {
              id
            }
          }
        `,
      }),
    })
      .then(data => data.json())
      .then(({ data, errors }) => {
        if (errors) {
          errors.forEach(({ message }) => console.error(message));
        } else {
          console.log(data);
        }
        // localStorage.setItem('manifold_user_id', id);
      });
  }

  return `
  <manifold-connection env="${env}">
    <manifold-auth-token token="${token}|${new Date(Date.now() + 6.04e8).getTime()}"/>
    ${storyFn()}
  </manifold-connection>
`;
};
