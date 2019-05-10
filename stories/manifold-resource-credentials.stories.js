import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-credentials.md';

storiesOf('Resource Credentials 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => '<manifold-resource-credentials resource-name="stripe"></manifold-resource-credentials>'
  );
