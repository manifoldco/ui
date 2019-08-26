import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-service-card.md';

storiesOf('Service card', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'JawsDB',
    () => `<manifold-service-card product-label="jawsdb-mysql"></manifold-service-card>`
  )
  .add('Zerosix', () => `<manifold-service-card product-label="zerosix"></manifold-service-card>`)
  .add(
    'Elegant CMS by ID',
    () =>
      `<manifold-service-card product-id="234qqzb2wm6gavkvaqr9e6b54j9dg"></manifold-service-card>`
  )
  .add(
    'With CTA',
    () => `
      <manifold-service-card product-label="zerosix">
        <manifold-button slot="cta">
          Choose ZeroSix
        </manifold-button>
      </manifold-service-card>
`
  );
