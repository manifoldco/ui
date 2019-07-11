import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-status.md';

storiesOf('Resource Status 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('default', () => `
    <manifold-mock-resource>
      <manifold-resource-status></manifold-resource-status>
    </manifold-mock-resource>
  `)
  .add('small tag', () => `
    <manifold-mock-resource>
      <manifold-resource-status size="small"></manifold-resource-status>
    </manifold-mock-resource>
  `);
