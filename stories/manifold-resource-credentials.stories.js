import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-credentials.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Resource Credentials 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-resource-container resource-name="cms-stage">
        <manifold-resource-credentials></manifold-resource-credentials>
      </manifold-resource-container>
`
  )
  .add(
    'custom buttons',
    () => `
      <manifold-resource-container resource-name="cms-stage">
        <manifold-resource-credentials>
          <manifold-button color="orange" slot="show-button">
            Show credentials
          </manifold-button>
          <manifold-button color="orange" slot="hide-button">
            Hide credentials
          </manifold-button>
        </manifold-resource-credentials>
      </manifold-resource-container>
`
  );
