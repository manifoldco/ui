import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldProduct } from './manifold-product';
import { product } from '../../spec/mock/graphql';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const graphqlEndpoint = 'http://test.com/graphql';

async function setup(productLabel: string) {
  const page = await newSpecPage({
    components: [ManifoldProduct],
    html: `<div></div>`,
  });
  const component = page.doc.createElement('manifold-product');
  component.productLabel = productLabel;
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
  });

  (page.root as HTMLDivElement).appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-product>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches the product by label on load', async () => {
    const productLabel = 'product-label';
    fetchMock.mock(graphqlEndpoint, product);
    await setup(productLabel);
    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
  });

  it('fetches the product by label on change', async () => {
    const productLabel = 'product-label';
    fetchMock.once('*', { status: 200, body: {} });

    const { page, component } = await setup(productLabel);

    const newLabel = 'new-product-label';
    fetchMock.mock(graphqlEndpoint, product);

    component.productLabel = newLabel;
    await page.waitForChanges();

    expect(fetchMock.called(graphqlEndpoint)).toBe(true);
  });
});
