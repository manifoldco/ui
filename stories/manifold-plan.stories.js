import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-plan.md';

storiesOf('Plan', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'ElegantCMS Free',
    () => '<manifold-plan product-label="elegant-cms" plan-label="manifold-developer"></manifold-plan>'
  )
  .add(
    'JawsDB Kitefin',
    () => '<manifold-plan product-label="jawsdb-mysql" plan-label="kitefin"></manifold-plan>'
  )
  .add(
    'JawsDB Custom',
    () => '<manifold-plan product-label="jawsdb-mysql" plan-label="custom"></manifold-plan>'
  );
