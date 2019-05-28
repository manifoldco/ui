import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-marketplace.md';

storiesOf('Marketplace', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      '<manifold-marketplace link-format="/products/:product" template-link-format="/products/custom/:template" preserve-event></manifold-marketplace>'
  )
  .add('no templates', () => '<manifold-marketplace hide-templates></manifold-marketplace>')
  .add('compact', () => '<manifold-marketplace hide-categories></manifold-marketplace>')
  .add(
    'filtered',
    () =>
      '<manifold-marketplace hide-categories products="iron_cache,iron_mq,iron_worker"></manifold-marketplace>'
  );
