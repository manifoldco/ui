import { storiesOf } from '@storybook/html';
import { withKnobs, radios, text } from '@storybook/addon-knobs';

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
  .add('auth', () => {
    const options = { Production: 'prod', Staging: 'stage' };
    const env = radios('env', options, 'stage');
    const authType = radios('authType', { Manual: 'manual', Oauth: 'oauth' }, 'oauth');
    const token = text('manifold_api_token', localStorage.getItem('manifold_api_token') || '');

    return `
      <manifold-connection env="${env}">
        <p><em>These resources are loaded from the server rather than mocks</em></p>
        <manifold-auth-token token="${token}" auth-type="${authType}"></manifold-auth-token>
        <manifold-resource-list></manifold-resource-list>
      </manifold-connection>`;
  });

/* TODO Re add metrics logging story once analytics-ingest is ready
  Disabling till the new logging story is ready to provide filtered links to check data dog. 
  This code should properly error and report, uncomment and update the data dog link when avaible.
*/
// .add('metrics logging', () => {
//   const options = { Production: 'prod', Staging: 'stage' };
//   const env = radios('env', options, 'stage');

//   return `
//     <manifold-connection env="${env}">
//       <p>Shortly after this component loads, you should see <a href="https://app.datadoghq.com/logs?cols=%22%5B%5C%22core_host%5C%22%2C%5C%22core_service%5C%22%5D%22&event&from_ts=1566584997801&index=main&live=true&messageDisplay=inline&query=%40browser-source%3Amanifold-ui&stream_sort=desc&to_ts=1566585897801">logs in DataDog</a></p>
//       <manifold-service-card product-label="fake-service"></manifold-service-card >
//     </manifold-connection>`;
//  });
