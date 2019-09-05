import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Copy credentials 🔒', module)
  .addDecorator(withKnobs)
  .addDecorator(manifoldConnectionDecorator)
  .add('default', () => {
    const resourceLabel = text('resource-label', 'config');
    text('📋 clipboard test', '');
    return `
      <style>
        button {
          cursor: hover;
        }
        button:hover {
          color: blue;
        }
      </style>
      <manifold-data-copy-credentials-button resource-label="${resourceLabel}">
        Copy
      </manifold-data-copy-credentials-button>
    `;
  });
