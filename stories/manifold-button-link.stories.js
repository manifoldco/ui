import { storiesOf } from '@storybook/html';
import { eye } from '@manifoldco/icons';
import markdown from '../docs/docs/components/manifold-button-link.md';

const renderButton = color =>
  `
    <div>
      <manifold-button-link color=${color || '""'} href="#">${color ||
    'Default'}</manifold-button-link>
      <br />
      <br />
      <manifold-button-link color=${color || '""'} href="#">
        <manifold-icon icon="${eye}"></manifold-icon>
        &nbsp;with icon
      </manifold-button-link>
      <br />
      <br />
      <manifold-button-link color=${color || '""'} href="#" size="small">${color ||
    'Default'} small</manifold-button-link>
    </div>
  `;

storiesOf('Button Link', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add('default', () => renderButton())
  .add('black', () => renderButton('black'))
  .add('gray', () => renderButton('gray'))
  .add('orange', () => renderButton('orange'))
  .add('pink', () => renderButton('pink'));
