import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-product.md';

storiesOf('Product', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'JawsDB',
    () => `
      <manifold-product product-label="jawsdb-mysql">
        <manifold-link-button slot="cta">Get JawsDB MySQL</manifold-link-button>
      </manifold-product>`
  )
  .add(
    'Zerosix',
    () => `
      <manifold-product product-label="zerosix">
        <manifold-link-button slot="cta">Get Zerosix</manifold-link-button>
      </manifold-product>`
  );
