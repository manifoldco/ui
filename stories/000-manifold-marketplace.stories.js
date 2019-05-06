import { storiesOf } from '@storybook/html';

storiesOf('Marketplace', module)
  .add('default', () => '<manifold-marketplace></manifold-marketplace>')
  .add('no templates', () => '<manifold-marketplace hide-templates></manifold-marketplace>')
  .add('compact', () => '<manifold-marketplace hide-categories></manifold-marketplace>')
  .add(
    'filtered',
    () =>
      '<manifold-marketplace hide-categories products="iron_cache,iron_mq,iron_worker"></manifold-marketplace>'
  );
