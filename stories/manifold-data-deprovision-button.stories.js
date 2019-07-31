import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-deprovision-button.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Provision Button [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-provision-button resource-label="my-resource">
        Deprovision resource
      </manifold-data-provision-button>
    `
  );
