import { storiesOf } from '@storybook/html';
import markdown from '../src/components/manifold-resource-status/readme.md';

storiesOf('Resource Status 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => '<manifold-resource-status resource-name="my-resource"></manifold-resource-status>'
  );
