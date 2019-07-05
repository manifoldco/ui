import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-list.md';

storiesOf('Has Resources 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(storyFn => localStorage.manifold_api_token ?
    storyFn()
    : 'Set your token under `manifold_api_token` in localstorage then refresh to view this story')
  .add(
    'The user has resources',
    () => `
      <manifold-connection>
        <manifold-auth-token token="${localStorage.manifold_api_token}"/>
        <manifold-data-has-resource>
          <span slot="has-resource">Has resources</span>
          <span slot="no-resource">No resources</span>
        </manifold-data-has-resource>
      </manifold-connection>
    `
  )
  .add(
    'The user has no resources',
    () => `
      <manifold-data-has-resource paused>
        <span slot="has-resource">Has resources</span>
        <span slot="no-resource">No resources</span>
      </manifold-data-has-resource>
    `
  );
