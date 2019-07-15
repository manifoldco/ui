import { storiesOf } from '@storybook/html';
import markdown from '../docs/docs/components/manifold-resource-card.md';

storiesOf('Resource card 🔒 ', module)
  .addParameters({ readme: { sidebar: markdown } })
  .add(
    'View resource',
    () => '<manifold-resource-card-view name="My resource" label="my-resource" logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png" resource-id="1234" resource-status="available"/>'
  )
  .add(
    'Loading resource',
    () => '<manifold-resource-card-view name="My resource" label="my-resource" logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png" loading="" resource-status="unknown"/>'
  )
  .add(
    'Resource with link',
    () => '<manifold-resource-card-view name="My resource" label="my-resource" logo="https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png" resource-id="1234" resource-status="unknown" resource-link-format="/resources/:resource" />'
  );
