import { storiesOf } from '@storybook/html';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { manifoldConnectionDecorator } from './data/connectionDecorator';
import { getProductLabels, getPlanIds } from './data/retrieve-data';

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
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getProductLabels(env);
    const productLabel = select('product-label', labels, labels[0]);
    return `
      <manifold-product product-label="${productLabel}">
        <manifold-button slot="cta">
          Get <manifold-data-product-name product-label="${productLabel}"></manifold-data-product-name>
        </manifold-button>
      </manifold-product>`;
  })
  .add('plan selector', () => {
    const freePlans = boolean('free-plans', false);
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getProductLabels(env);
    const productLabel = select('product-label', labels, labels[0]);
    return `
    <manifold-plan-selector product-label="${productLabel}" ${
      freePlans ? 'free-plans' : ''
    }></manifold-plan-selector>`;
  })
  .add('plan card', () => {
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getPlanIds(env);
    const planID = select('product-label', labels, labels[Object.keys(labels)[0]]);
    return `<manifold-plan plan-id="${planID}"></manifold-plan>`;
  })
  .add('service card', () => {
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getProductLabels(env);
    const productLabel = select('product-label', labels, labels[0]);
    return `<manifold-service-card product-label="${productLabel}"></manifold-service-card>`;
  })
  .add('name', () => {
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getProductLabels(env);
    const productLabel = select('product-label', labels, labels[0]);
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
    const env = localStorage.getItem('manifold_auth_env');
    const labels = getProductLabels(env);
    const productLabel = select('product-label', labels, labels[0]);
    return `
      <style>img { height: 256px; width: 256px; }</style>
      <manifold-data-product-logo product-label="${productLabel}"></manifold-data-product-logo>`;
  });
