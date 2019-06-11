import { storiesOf } from '@storybook/html';

const renderButton = color =>
  `
    <div>
      <manifold-button color=${color || '""'}>${color || 'Default'}</manifold-button>
      <br />
      <br />
      <manifold-button color=${color || '""'} size="small">${color ||
    'Default'} small</manifold-button>
      <br />
      <br />
      <manifold-button color=${color || '""'} disabled>${color ||
    'Default'} disabled</manifold-button>
    </div>
  `;

storiesOf('Button', module)
  .add('default', () => renderButton())
  .add('black', () => renderButton('black'))
  .add('gray', () => renderButton('gray'))
  .add('orange', () => renderButton('orange'))
  .add('pink', () => renderButton('pink'));
