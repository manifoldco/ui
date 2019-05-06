import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-data-product-logo/readme.md';

storiesOf('Product Logo [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => '<manifold-data-product-logo product-label="aiven-redis"></manifold-data-product-logo>'
  );
