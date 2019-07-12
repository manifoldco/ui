import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-service-card.md';

storiesOf('Product card', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'JawsDB',
    () => `
      <manifold-product-card product-label="jawsdb-mysql"></manifold-product-card>`
  )
  .add(
    'Zerosix',
    () => `
      <manifold-product-card product-label="zerosix"></manifold-product-card>`
  );
