import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/data/manifold-data-resource-list.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Resource List 🔒 [Data]', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () => `
      <manifold-data-resource-list resource-link-format="/resources/:resource" paused>
        <ul>
          <li><a href="/resources/db-prod">db-prod</a></li>
          <li><a href="/resources/db-stage">db-stage</a></li>
          <li><a href="/resources/logging-prod">logging-prod</a></li>
          <li><a href="/resources/logging-test">logging-test</a></li>
        </ul>
      </manifold-data-resource-list>
    `);
