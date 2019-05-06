import { storiesOf } from '@storybook/html';

storiesOf('Plan Selector', module)
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
