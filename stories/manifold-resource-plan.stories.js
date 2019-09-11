import { storiesOf } from '@storybook/html';

storiesOf('Resource Plan Details 🔒', module).add(
  'default',
  () => `
      <manifold-mock-resource>
        <manifold-resource-plan></manifold-resource-plan>
      </manifold-mock-resource>
    `
);
