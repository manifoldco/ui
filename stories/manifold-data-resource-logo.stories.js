import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-resource-logo.md';

storiesOf('Resource Logo [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      `
        <manifold-connection>
          <manifold-auth-token token="${localStorage.getItem('manifold_api_token')}" />
          <manifold-data-resource-logo resource-label="mail-gun-123"></manifold-data-resource-logo>
        </manifold-connection>
      `
  );
