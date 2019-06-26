import { storiesOf } from '@storybook/html';

const renderBadge = (text = 'Normal', tag) =>
  `
    <style>
      :root {
        --manifold-tag-radius: 1em;
        --manifold-tag-free-background: var(--manifold-g-green);
        --manifold-tag-text-transform: uppercase;
      }
    </style>
    <div>
      <manifold-badge ${tag && `data-tag="${tag}"`}>${text}</manifold-badge>
    </div>
  `;

storiesOf('Badge', module)
  .add('default', () => renderBadge())
  .add('free', () => renderBadge('Free', 'free'));
