import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-data-product-name/readme.md';

storiesOf('Product Name [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      '<manifold-data-product-name product-label="jawsdb-postgres"></manifold-data-product-name>'
  );
