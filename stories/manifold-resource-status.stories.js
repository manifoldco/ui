import { storiesOf } from '@storybook/html';

storiesOf('Resource Status 🔒', module)
  .add(
    'default',
    () => `
    <manifold-mock-resource>
      <manifold-resource-status></manifold-resource-status>
    </manifold-mock-resource>
  `
  )
  .add(
    'small',
    () => `
    <manifold-mock-resource>
      <manifold-resource-status size="small"></manifold-resource-status>
    </manifold-mock-resource>
  `
  )
  .add(
    'x-small',
    () => `
    <manifold-mock-resource>
      <manifold-resource-status size="xsmall"></manifold-resource-status>
    </manifold-mock-resource>
  `
  );
