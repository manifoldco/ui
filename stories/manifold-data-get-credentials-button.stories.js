import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-sso-button.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Get credentials Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-get-credentials-button resource-label="database" copy-to-clipboard="">
        Get credentials
      </manifold-data-get-credentials-button>
    `
  );
