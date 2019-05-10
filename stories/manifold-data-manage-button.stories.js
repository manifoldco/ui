import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-manage-button.md';

storiesOf('Manage Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () =>
      '<manifold-data-manage-button resource-name="my-resource">💾 Save</manifold-data-manage-button>'
  );
