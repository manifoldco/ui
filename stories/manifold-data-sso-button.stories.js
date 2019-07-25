import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-sso-button.md';

storiesOf('SSO Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => `
      <manifold-data-sso-button resource-label="my-resource" resource-id="1234">
        SSO
      </manifold-data-sso-button>
    `
  );
