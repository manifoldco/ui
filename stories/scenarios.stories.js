import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { manifoldConnectionDecorator } from './data/connectionDecorator';

function withVeryFakeExpiry(token) {
  /* During the ui transition from REST calls to GraphQL and PUMA,
  this component needs to be able to consume several types of tokens
  to account for the demo apps that already exist and the testing of
  tokens with expirations set. This fake expiry allows the resources to
  become visible in testing, which means the actual token may expire
  without the component being aware - if so it will return a 401 and
  should be changed for a fresh one. */
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  const unixTime = Math.floor(expiry.getTime() / 1000);
  const expirySeconds = unixTime.toString();
  return `${token}|${expirySeconds}`;
}

storiesOf('Scenarios', module)
  .addDecorator(withKnobs)
  .addDecorator(manifoldConnectionDecorator)
  .add('OAuth', () => {
    return `
      <manifold-connection env="stage">
        <manifold-performance>
          <p><em>These resources are loaded from the server rather than mocks</em></p>
          <manifold-auth-token token="${withVeryFakeExpiry(
            localStorage.getItem('manifold_api_token') || ''
          )}"/>
          <manifold-resource-list />
        </manifold-performance>
      </manifold-connection>`;
  })
  .add(
    'metrics logging',
    () =>
      `<manifold-performance>
        <p>Shortly after this component loads, you should see <a href="https://app.datadoghq.com/logs?cols=%22%5B%5C%22core_host%5C%22%2C%5C%22core_service%5C%22%5D%22&event&from_ts=1566584997801&index=main&live=true&messageDisplay=inline&query=%40browser-source%3Amanifold-ui&stream_sort=desc&to_ts=1566585897801">logs in DataDog</a></p>
        <manifold-plan product-label="elegant-cms" plan-label="manifold-developer"></manifold-plan>
      </manifold-performance>`
  );
