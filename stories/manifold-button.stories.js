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
  .add('pink', () => renderButton('pink'))
  .add(
    'link',
    () => `
  <div>
    <manifold-button color="orange" href="/about" preserve-event>Link</manifold-button>
    <br />
    <br />
    <manifold-button color="orange" href="/about" size="small">Link small</manifold-button>
    <br />
    <br />
    <manifold-button color="orange" href="/about" disabled>Link disabled</manifold-button>
  </div>
`
  );
