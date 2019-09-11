import { storiesOf } from '@storybook/html';

storiesOf('Resource Product Details 🔒', module).add(
  'default',
  () => `
      <manifold-mock-resource>
        <manifold-resource-product></manifold-resource-product>
      </manifold-mock-resource>
    `
);
