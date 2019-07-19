import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-product-logo.md';

storiesOf('Product Logo [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      '<manifold-connection><manifold-data-product-logo product-label="aiven-redis"></manifold-data-product-logo></manifold-connection>'
  );
