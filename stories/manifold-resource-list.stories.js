import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-resource-list.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Resource List 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
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
