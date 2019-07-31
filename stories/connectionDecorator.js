export const manifoldConnectionDecorator = storyFn => `
  <manifold-connection env="stage">
    <manifold-auth-token oauth-url="https://login.stage.manifold.co/signin/oauth/web"/>
    ${storyFn()}
  </manifold-connection>
`;
