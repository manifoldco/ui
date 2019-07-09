import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-product.md';

storiesOf('Resource Product Details 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => `
      <manifold-mock-resource>
        <manifold-resource-product></manifold-resource-product>
      </manifold-mock-resource>
    `
  )
  .add(
    'With a card wrapper',
    () => `
      <manifold-mock-resource>
        <manifold-resource-product as-card=""></manifold-resource-product>
      </manifold-mock-resource>
    `
  );
