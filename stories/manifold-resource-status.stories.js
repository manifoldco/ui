import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-status.md';

storiesOf('Resource Status 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => '<manifold-resource-status resource-name="my-resource"></manifold-resource-status>'
  );
