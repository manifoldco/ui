// Creates a fake token provider and manifold connection that adds the api token from localstorage
// with an expiriy date a week from when it is created. 6.04e8 is a week in milliseconds.
export const manifoldConnectionDecorator = storyFn => `
  <manifold-connection>
    <manifold-auth-token token="${localStorage.manifold_api_token}|${new Date(
  Date.now() + 6.04e8
).getTime()}"/>
    ${storyFn()}
  </manifold-connection>
`;
