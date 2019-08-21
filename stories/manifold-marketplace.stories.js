import { storiesOf } from '@storybook/html';

import markdown from '../docs/docs/components/manifold-marketplace.md';
import { manifoldConnectionDecorator } from './connectionDecorator';

storiesOf('Marketplace', module)
  .addParameters({ readme: { sidebar: markdown } })
  .addDecorator(manifoldConnectionDecorator)
  .add(
    'default',
    () =>
      `<manifold-marketplace
        product-link-format="/products/:product"
        preserve-events
        template-link-format="/products/custom/:template"
      ></manifold-marketplace>`
  )
  .add(
    'no templates',
    () => `
      <manifold-marketplace
        hide-templates
      ></manifold-marketplace>`
  )
  .add(
    'featured',
    () => `
      <manifold-marketplace
        featured="zerosix,jawsdb-maria,jawsdb-mysql,jawsdb-postgres"
      ></manifold-marketplace>`
  )
  .add(
    'compact',
    () => `
      <manifold-marketplace
        hide-categories
        hide-search
        products="iron_cache,iron_mq,jawsdb-mysql,jawsdb-postgres,mailgun,logdna,iron_worker,zerosix"
      ></manifold-marketplace>`
  )
  .add(
    'curated',
    () => `
        <manifold-marketplace
          hide-templates
          hide-search
          hide-categories
          products="logdna,scoutapp,timber-logging,cloudcube"
        ></manifold-marketplace>
      `
  )
  .add('with auth', () => `<manifold-marketplace with-auth></manifold-marketplace>`);
