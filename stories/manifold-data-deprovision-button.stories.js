import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-data-deprovision-button.md';

storiesOf('Provision Button [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => `
      <manifold-data-provision-button resource-label="my-resource">
        Deprovision resource
      </manifold-data-provision-button>
    `
  );
