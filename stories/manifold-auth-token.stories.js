import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-auth-token.md';

function withVeryFakeExpiry(token) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  const encodedExpiry = Buffer.from(expiry.toUTCString()).toString('base64');
  return `${token}.${encodedExpiry}`;
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
