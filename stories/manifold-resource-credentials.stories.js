import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-credentials.md';

const credentialsView = `
<manifold-resource-container resource-name="cms-stage">
  <manifold-resource-credentials></manifold-resource-credentials>
</manifold-resource-container>
`;

storiesOf('Resource Credentials 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('default', () => {
    window.localStorage.setItem('manifold_api_token', process.env.STORYBOOK_MANIFOLD_API_TOKEN);
    return credentialsView;
  });
