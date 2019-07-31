import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-resource-plan.md';

storiesOf('Resource Plan Details 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'default',
    () => `
      <manifold-mock-resource>
        <manifold-resource-plan></manifold-resource-plan>
      </manifold-mock-resource>
    `
  );
