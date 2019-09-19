import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldProduct } from './manifold-product';
import { product } from '../../spec/mock/graphql';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const graphqlEndpoint = 'http://test.com/graphql';

describe('<manifold-product>', () => {
  let page: SpecPage;
  let element: HTMLManifoldProductElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldProduct],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-product');
    element.graphqlFetch = createGraphqlFetch({
      endpoint: () => graphqlEndpoint,
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });

    fetchMock.reset();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches the product by label on load', async () => {
    const productLabel = 'product-label';
    fetchMock.mock(`begin:${graphqlEndpoint}`, product);

    const root = page.root as HTMLElement;
    element.productLabel = productLabel;
    root.appendChild(element);
    await page.waitForChanges();

    expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
  });

  it('fetches the product by label on change', async () => {
    const productLabel = 'product-label';
    fetchMock.once('*', 200);

    const root = page.root as HTMLElement;
    element.productLabel = productLabel;
    root.appendChild(element);
    await page.waitForChanges();

    const newLabel = 'new-product-label';
    fetchMock.mock(`begin:${graphqlEndpoint}`, product);

    element.productLabel = newLabel;
    await page.waitForChanges();

    expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
  });
});
