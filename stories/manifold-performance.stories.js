import { storiesOf } from '@storybook/html';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Performance', module)
  .addDecorator(manifoldConnectionDecorator)
  .add(
    '<manifold-plan> metrics',
    () => `
    <manifold-performance>
      <p>Shortly after this component loads, you should see <a href="https://app.datadoghq.com/logs?cols=%22%5B%5C%22core_host%5C%22%2C%5C%22core_service%5C%22%5D%22&event&from_ts=1566584997801&index=main&live=true&messageDisplay=inline&query=%40browser-source%3Amanifold-ui&stream_sort=desc&to_ts=1566585897801">logs in DataDog</a></p>
      <manifold-plan product-label="elegant-cms" plan-label="manifold-developer"></manifold-plan>
    </manifold-performance>`
  );
