import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-marketplace/readme.md';

storiesOf('Marketplace', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('default', () => '<manifold-marketplace></manifold-marketplace>')
  .add('no templates', () => '<manifold-marketplace hide-templates></manifold-marketplace>')
  .add('compact', () => '<manifold-marketplace hide-categories></manifold-marketplace>')
  .add(
    'filtered',
    () =>
      '<manifold-marketplace hide-categories products="iron_cache,iron_mq,iron_worker"></manifold-marketplace>'
  );
