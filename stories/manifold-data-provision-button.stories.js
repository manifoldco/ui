import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-provision-button.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Provision Button [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <div>
        <label for="my-provision-button">Resource Name</label>
        <input id="my-provision-button" value="my-resource">my-resource</input>
        <manifold-data-provision-button resource-label="my-resource">
          🚀 Provision Business plan on Prefab.cloud
        </manifold-data-provision-button>
      </div>
    `
  );
