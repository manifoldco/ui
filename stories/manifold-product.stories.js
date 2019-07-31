import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-product.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Product', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'JawsDB',
    () => `
      <manifold-product product-label="jawsdb-mysql">
        <manifold-button slot="cta">Get JawsDB MySQL</manifold-button>
      </manifold-product>`
  )
  .add(
    'Zerosix',
    () => `
      <manifold-product product-label="zerosix">
        <manifold-button slot="cta">Get Zerosix</manifold-button>
      </manifold-product>`
  );
