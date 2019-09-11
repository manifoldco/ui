import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Manage Button 🔒 [Data]', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () =>
      '<manifold-data-manage-button resource-label="my-resource">💾 Save</manifold-data-manage-button>'
  );
