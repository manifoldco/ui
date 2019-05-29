import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-status.md';

const view = `
  <manifold-resource-container resource-label="my-resource">
    <manifold-resource-status></manifold-resource-status>
  </manifold-resource-container>
`;

storiesOf('Resource Status 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('default', () => view);
