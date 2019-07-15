import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-rename-button.md';

storiesOf('Rename Button 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => `
      <manifold-data-rename-button resource-label="my-resource" resource-id="1234">
        Save
      </manifold-data-rename-button>
    `
  );
