import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-product-logo.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Product Logo [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () =>
      `
        <manifold-data-product-logo product-label="aiven-redis"></manifold-data-product-logo>
      `
  );
