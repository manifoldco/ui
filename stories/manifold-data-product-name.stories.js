import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-product-name.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Product Name [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () =>
      '<manifold-data-product-name product-label="jawsdb-postgres"></manifold-data-product-name>'
  );
