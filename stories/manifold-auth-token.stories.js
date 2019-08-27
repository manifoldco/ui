import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/advanced/authentication.md';

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

storiesOf('Auth Token Provider [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(storyFn =>
    localStorage.manifold_api_token
      ? storyFn()
      : 'Set a fresh token under `manifold_api_token` in localstorage then refresh to view this story'
  )
  .add(
    'See your resources',
    () => `
      <manifold-connection>
        These resources are loaded from the server rather than mocks
        <manifold-auth-token token="${withVeryFakeExpiry(localStorage.manifold_api_token)}"/>
        <manifold-resource-list />
      </manifold-connection>
    `
  );
