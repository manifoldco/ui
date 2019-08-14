import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldProduct } from './manifold-product';
import { connections } from '../../utils/connections';
import { Product, Provider } from '../../spec/mock/catalog';
import { createRestFetch } from '../../utils/restFetch';

async function setup(productLabel: string) {
  const page = await newSpecPage({
    components: [ManifoldProduct],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-product');
  component.productLabel = productLabel;
  component.restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-product>', () => {
  it('fetches the product by label on load', async () => {
    const productLabel = 'product-label';
    fetchMock.mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product]);
    fetchMock.mock(`${connections.prod.catalog}/providers/${Product.body.provider_id}`, [
      Product,
      Provider,
    ]);

    await setup(productLabel);

    expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
      true
    );
    expect(
      fetchMock.called(`${connections.prod.catalog}/providers/${Product.body.provider_id}`)
    ).toBe(true);
  });
});
