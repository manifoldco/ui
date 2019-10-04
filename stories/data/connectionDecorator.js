import { text, radios } from '@storybook/addon-knobs';
import { gql } from '@manifoldco/gql-zero';

// Creates a fake token provider and manifold connection that adds the api token from localstorage.
export const manifoldConnectionDecorator = storyFn => {
  const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');
  const options = { Production: 'prod', Staging: 'stage' };
  const env = radios('env', options, 'prod');
  const authType = radios('authType', { Manual: 'manual', Oauth: 'oauth' }, 'manual');
  localStorage.setItem('manifold_api_token', token); // update localStorage to persist

  // grab user ID from Manifold (we need this in other stories)
  if (
    token &&
    (!localStorage.getItem('manifold_user_id') ||
      localStorage.getItem('manifold_user_id') === 'undefined')
  ) {
    (async () => {
      const graphQLPayload = await fetch('https://api.manifold.co/graphql', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
        body: JSON.stringify({
          query: gql`
            query GET_PROFILE_ID {
              profile {
                id
              }
            }
          `,
        }),
      });

      const { data, errors } = graphQLPayload.json();
      if (data) {
        const { id } = data.profile;
        localStorage.setItem('manifold_user_id', id);
      }
      if (errors) {
        const identityPayload = await fetch('https://api.identity.manifold.co/v1/self', {
          headers: { authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
        });

        const { id } = identityPayload.json();
        localStorage.setItem('manifold_user_id', id);
      }
    })();
  }

  return `
  <manifold-connection env="${env}">
    <manifold-auth-token token="${token}" auth-type="${authType}"></manifold-auth-token>
    ${storyFn()}
  </manifold-connection>
`;
};
