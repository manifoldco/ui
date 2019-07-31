import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-manage-button.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Manage Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () =>
      '<manifold-data-manage-button resource-label="my-resource">💾 Save</manifold-data-manage-button>'
  );
