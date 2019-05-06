import { storiesOf } from '@storybook/html';

storiesOf('Product', module)
  .add('JawsDB', () => '<manifold-product product-label="jawsdb-mysql"></manifold-product>')
  .add('Zerosix', () => '<manifold-product product-label="zerosix"></manifold-product>');
