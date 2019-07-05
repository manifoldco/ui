import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-list.md';

storiesOf('Resource list 🔒', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(storyFn => localStorage.manifold_api_token ?
    storyFn()
    : 'Set your token under `manifold_api_token` in localstorage then refresh to view this story')
  .add(
    'Listing all resources',
    () => `
      <manifold-connection>
        <manifold-auth-token token="${localStorage.manifold_api_token}"/>
        <manifold-resource-list />
      </manifold-connection>
    `
  )
  .add(
    'Loading resources',
    () => `
      <manifold-connection>
        <manifold-auth-token token="${localStorage.manifold_api_token}"/>
        <manifold-resource-list paused="">
          <manifold-resource-card-view loading="" label="loading" slot="loading" />
        </manifold-resource-list>
      </manifold-connection>
    `
  )
  .add(
    'No resources',
    () => `
      <manifold-connection>
        <manifold-auth-token token="empty"/>
        <manifold-resource-list label-filter="i-do-not-exists">
          <div slot="no-resources">
            There are no resources
          </div>
        </manifold-resource-list>
      </manifold-connection>
    `
  );
