import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Copy Credentials Button', module)
  .addDecorator(manifoldConnectionDecorator)
  .add('default', () => '<manifold-data-copy-credentials></manifold-data-copy-credentials>');
