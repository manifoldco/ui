import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('SSO Button 🔒 [Data]', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-sso-button resource-label="my-resource" resource-id="1234">
        SSO
      </manifold-data-sso-button>
    `
  );
