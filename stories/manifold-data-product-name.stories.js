import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-product-name.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Product Name', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'from product label',
    () =>
      '<manifold-data-product-name product-label="jawsdb-postgres"></manifold-data-product-name>'
  )
  .add(
    'from resource',
    () => '<manifold-data-product-name resource-label="my-resource"></manifold-data-product-name>'
  );
