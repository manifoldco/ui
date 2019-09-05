import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-sso-button.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Copy credentials Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-copy-credentials-button resource-label="database" copy-to-clipboard="">
        Copy credentials
      </manifold-data-copy-credentials-button>
    `
  );
