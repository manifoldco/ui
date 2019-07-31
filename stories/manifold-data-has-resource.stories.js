import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-resource-list.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Has Resources 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'The user has resources',
    () => `
      <manifold-data-has-resource>
        <span slot="has-resource">Has resources</span>
        <span slot="no-resource">No resources</span>
      </manifold-data-has-resource>
    `
  )
  .add(
    'The user has no resources',
    () => `
      <manifold-data-has-resource paused>
        <span slot="has-resource">Has resources</span>
        <span slot="no-resource">No resources</span>
      </manifold-data-has-resource>
    `
  );
