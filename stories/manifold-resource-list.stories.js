import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Resource List 🔒', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-resource-list paused />
    `
  )
  .add(
    'loading',
    () => `
      <manifold-resource-list paused></manifold-resource-list>
    `
  )
  .add(
    'empty',
    () => `
      <manifold-resource-list label-filter="i-do-not-exists">
        <div slot="no-resources">
          There are no resources
        </div>
      </manifold-resource-list>
    `
  );
