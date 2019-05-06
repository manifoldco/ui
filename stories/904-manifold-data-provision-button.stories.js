import { storiesOf } from '@storybook/html';

storiesOf('Provision Button [Data]', module).add(
  'default',
  () => `
  <label for="my-provision-button">Resource Name</label>
  <manifold-data-provision-button input-id="my-provision-button">
    🚀 Provision Business plan on Prefab.cloud
  </manifold-data-provision-button>`
);
