import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-product-name.md';

storiesOf('Product Name [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      '<manifold-data-product-name product-label="jawsdb-postgres"></manifold-data-product-name>'
  );
