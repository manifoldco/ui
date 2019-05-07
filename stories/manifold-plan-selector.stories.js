import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-plan-selector/readme.md';

storiesOf('Plan Selector', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'JawsDB',
    () => '<manifold-plan-selector product-label="jawsdb-mysql"></manifold-plan-selector>'
  )
  .add(
    'Memcachier',
    () => '<manifold-plan-selector product-label="memcachier-cache"></manifold-plan-selector>'
  )
  .add(
    'Zerosix',
    () => '<manifold-plan-selector product-label="zerosix"></manifold-plan-selector>'
  );
