export const manifoldConnectionDecorator = storyFn => `
  <manifold-connection>
    <manifold-auth-token token="${localStorage.manifold_api_token}|${new Date(
  Date.now() + 6.04e8
).getTime()}"/>
    ${storyFn()}
  </manifold-connection>
`;
