import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-resource-list.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Resource list 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'Listing all resources',
    () => `
      <manifold-resource-list />
    `
  )
  .add(
    'Loading resources',
    () => `
      <manifold-resource-list paused="">
        <manifold-resource-card-view loading="" label="loading" slot="loading" />
      </manifold-resource-list>
    `
  )
  .add(
    'No resources',
    () => `
      <manifold-resource-list label-filter="i-do-not-exists">
        <div slot="no-resources">
          There are no resources
        </div>
      </manifold-resource-list>
    `
  );
