import { storiesOf } from '@storybook/html';

const renderButton = color =>
  `
    <div>
      <manifold-button-link color=${color || '""'} href="#">${color ||
    'Default'}</manifold-button-link>
      <br />
      <br />
      <manifold-button-link color=${color || '""'} href="#" size="small">${color ||
    'Default'} small</manifold-button-link>
    </div>
  `;

storiesOf('Button Link', module)
  .add('default', () => renderButton())
  .add('black', () => renderButton('black'))
  .add('gray', () => renderButton('gray'))
  .add('orange', () => renderButton('orange'))
  .add('pink', () => renderButton('pink'));
