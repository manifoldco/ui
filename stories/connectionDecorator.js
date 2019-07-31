export const manifoldConnectionDecorator = storyFn => `
  <manifold-connection>
    <manifold-auth-token/>
    ${storyFn()}
  </manifold-connection>
`;
