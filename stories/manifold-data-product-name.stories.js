import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import markdown from '../docs/docs/data/manifold-data-product-name.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Product Name', module)
  .addDecorator(withKnobs)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add('from product label', () => {
    const productLabel = text('product-label', 'jawsdb-postgres');
    return `<manifold-data-product-name product-label="${productLabel}"></manifold-data-product-name>`;
  })
  .add('from resource', () => {
    const resourceLabel = text('resource-label (requires manifold_api_key)', 'config');
    return `<manifold-data-product-name resource-label="${resourceLabel}"></manifold-data-product-name>`;
  });
