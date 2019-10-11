import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { manifoldConnectionDecorator } from './data/connectionDecorator';
import productLabels from './data/product-labels';
import planLabels from './data/plan-labels';

storiesOf('Catalog', module)
  .addDecorator(manifoldConnectionDecorator)
  .addDecorator(withKnobs)
  .add('marketplace', () => {
    const search = boolean('search', true);
    const categories = boolean('categories', true);
    const templates = boolean('templates', false);
    const featured = text('featured', '');
    const products = text('products', '');
    return `<manifold-marketplace
      product-link-format="/products/:product"
      preserve-events
      ${featured ? `featured="${featured}"` : ''}
      ${templates === false ? 'hide-templates' : ''}
      ${categories === false ? 'hide-categories' : ''}
      ${products ? `products="${products}"` : ''}
      ${search === false ? 'hide-search' : ''}
      template-link-format="/products/custom/:template"
    ></manifold-marketplace>`;
  })
  .add('product page', () => {
    const productLabel = select('product-label', productLabels, 'jawsdb-mysql');
    return `
      <manifold-product product-label="${productLabel}">
        <manifold-button slot="cta">
          Get <manifold-data-product-name product-label="${productLabel}"></manifold-data-product-name>
        </manifold-button>
      </manifold-product>`;
  })
  .add('plan selector', () => {
    // these plans are important to focus in on
    const productLabel = select(
      'product-label',
      {
        'blitline (metered features)': 'blitline',
        'logdna (popular)': 'logdna',
        'mailgun (popular)': 'mailgun',
        'jawsdb-mysql (custom plan)': 'jawsdb-mysql',
        'memcachier-cache (many plans)': 'memcachier-cache',
        'prefab (tiny metered pricing)': 'prefab',
        'generic-tagging (mixed metered & non-metered plans)': 'generic-tagging',
        'zerosix (only-metered pricing)': 'zerosix', // metered pricing
        'ziggeo (tiered pricing)': 'ziggeo', // tiered pricing
      },
      'jawsdb-mysql'
    );
    const freePlans = boolean('free-plans', false);
    return `
    <manifold-plan-selector product-label="${productLabel}" ${
      freePlans ? 'free-plans' : ''
    }></manifold-plan-selector>`;
  })
  .add('plan card', () => {
    const productLabel = select('product-label', productLabels, 'ziggeo');
    const planLabel = select('plan-label', planLabels, 'custom');
    return `<manifold-plan product-label="${productLabel}" plan-label="${planLabel}"></manifold-plan>`;
  })
  .add('service card', () => {
    const productLabel = select('product-label', productLabels, 'timber-logging');
    return `<manifold-service-card product-label="${productLabel}"></manifold-service-card>`;
  })
  .add('name', () => {
    const productLabel = select('product-label', productLabels, 'jawsdb-postgres');
    return `<manifold-data-product-name product-label="${productLabel}"></manifold-data-product-name>`;
  })
  .add('name (from resource)', () => {
    const resourceLabel = text(
      'resource-label',
      localStorage.getItem('manifold-resource-label') || 'my-resource'
    );
    localStorage.setItem('manifold-resource-label', resourceLabel);
    return `<manifold-data-product-name resource-label="${resourceLabel}"></manifold-data-product-name>`;
  })
  .add('logo', () => {
    const productLabel = select('product-label', productLabels, 'aiven-redis');
    return `
      <style>img { height: 256px; width: 256px; }</style>
      <manifold-data-product-logo product-label="${productLabel}"></manifold-data-product-logo>`;
  });
