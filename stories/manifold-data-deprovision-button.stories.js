import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Provision Button [Data]', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-provision-button resource-label="my-resource">
        Deprovision resource
      </manifold-data-provision-button>
    `
  );
