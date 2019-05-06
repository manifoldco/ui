import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-product/readme.md';

storiesOf('Product', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('JawsDB', () => '<manifold-product product-label="jawsdb-mysql"></manifold-product>')
  .add('Zerosix', () => '<manifold-product product-label="zerosix"></manifold-product>');
