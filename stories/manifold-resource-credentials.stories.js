import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-resource-credentials/readme.md';

storiesOf('Resource Credentials 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => '<manifold-resource-credentials resource-name="stripe"></manifold-resource-credentials>'
  );
