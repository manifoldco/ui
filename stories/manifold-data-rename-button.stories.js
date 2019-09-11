import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Rename Button 🔒 [Data]', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-rename-button resource-label="my-resource" resource-id="1234">
        Save
      </manifold-data-rename-button>
    `
  );
