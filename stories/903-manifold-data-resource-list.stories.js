import { storiesOf } from '@storybook/html';

storiesOf('Resource List 🔒 [Data]', module).add(
  'default',
  () => `
  <manifold-data-resource-list link-format="/resources/:resource" paused>
  <ul>
    <li><a href="/resources/db-prod">db-prod</a></li>
    <li><a href="/resources/db-stage">db-stage</a></li>
    <li><a href="/resources/logging-prod">logging-prod</a></li>
    <li><a href="/resources/logging-test">logging-test</a></li>
  </ul>
</manifold-data-resource-list>`
);
