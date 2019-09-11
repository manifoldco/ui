import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { eye } from '@manifoldco/icons';

const colorOptions = {
  'default (white)': '',
  white: 'white',
  black: 'black',
  gray: 'gray',
  orange: 'orange',
  pink: 'pink',
};

storiesOf('Common', module)
  .addDecorator(withKnobs)
  .add('button', () => {
    const color = select('color', colorOptions, 'default');
    return `
    <div>
      <manifold-button color="${color}">${color || 'Default'}</manifold-button>
      <br />
      <br />
      <manifold-button color="${color}" href="#">
        <manifold-icon icon="${eye}"></manifold-icon>
        &nbsp;with icon
      </manifold-button>
      <br />
      <br />
      <manifold-button color="${color}" size="small">${color || 'Default'} small</manifold-button>
      <br />
      <br />
      <manifold-button color="${color}" disabled>${color || 'Default'} disabled</manifold-button>
    </div>
  `;
  })
  .add('button link', () => {
    const color = select('color', colorOptions, 'default');
    return `
    <div>
      <manifold-button-link color="${color}">${color || 'Default'}</manifold-button-link>
      <br />
      <br />
      <manifold-button-link color="${color}" href="#">
        <manifold-icon icon="${eye}"></manifold-icon>
        &nbsp;with icon
      </manifold-button-link>
      <br />
      <br />
      <manifold-button-link color="${color}" size="small">${color ||
      'Default'} small</manifold-button-link>
    </div>
  `;
  })
  .add('badge', () => {
    const type = select('type', { default: 'default', free: 'free' }, 'default');
    return `
    <style>
      :root {
        --manifold-tag-radius: 1em;
        --manifold-tag-free-background: var(--manifold-g-green);
        --manifold-tag-text-transform: uppercase;
      }
    </style>
    <div>
      <manifold-badge data-tag="${type}">${type}</manifold-badge>
    </div>`;
  })
  .add('toast', () => {
    const type = select(
      'alert-type',
      { default: '', error: 'error', warning: 'warning', success: 'success' },
      ''
    );
    const dismissable = boolean('dismissable', true);
    const message = text('message', 'This is a generic toast component.');
    return `<manifold-toast
        ${type ? `alert-type="${type}"` : ''}
        ${dismissable ? 'dismissable' : ''}
      >
        ${message}
      </manifold-toast>`;
  });
