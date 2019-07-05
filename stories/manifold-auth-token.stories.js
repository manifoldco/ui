import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/data/manifold-auth-token.md';

storiesOf('Auth Token Provider [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(storyFn => localStorage.manifold_api_token ?
    storyFn()
    : 'Set your token under `manifold_api_token` in localstorage then refresh to view this story')
  .add(
    'See your resources',
    () => `
      <manifold-connection>
        These resources are loaded from the server rather than mocks
        <manifold-auth-token token="${localStorage.manifold_api_token}"/>
        <manifold-resource-list />
      </manifold-connection>
    `
  );
