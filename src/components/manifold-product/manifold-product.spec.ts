import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldProduct } from './manifold-product';
import { connections } from '../../utils/connections';
import { Product, Provider } from '../../spec/mock/catalog';
import { createRestFetch } from '../../utils/restFetch';

async function setup({
  useAuth = false,
  productLabel,
  restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  }),
}: any) {
  const page = await newSpecPage({
    components: [ManifoldProduct],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-product');
  component.productLabel = productLabel;
  component.restFetch = restFetch;
  component.useAuth = useAuth;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-product>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches the product by label on load', async () => {
    const productLabel = 'product-label';
    fetchMock.mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product]);
    fetchMock.mock(`${connections.prod.catalog}/providers/${Product.body.provider_id}`, [Provider]);

    await setup({ productLabel });

    expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
      true
    );
    expect(
      fetchMock.called(`${connections.prod.catalog}/providers/${Product.body.provider_id}`)
    ).toBe(true);
  });

  it('fetches the product by label on change', async () => {
    const productLabel = 'product-label';
    fetchMock.once('*', []);

    const { component, page } = await setup({ productLabel });

    const newLabel = 'new-product-label';
    fetchMock.mock(`${connections.prod.catalog}/products/?label=${newLabel}`, [Product]);
    fetchMock.mock(`${connections.prod.catalog}/providers/${Product.body.provider_id}`, [Provider]);

    component.productLabel = newLabel;
    await page.waitForChanges();

    expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${newLabel}`)).toBe(true);
    expect(
      fetchMock.called(`${connections.prod.catalog}/providers/${Product.body.provider_id}`)
    ).toBe(true);
  });

  describe('v0 API', () => {
    it('[use-auth]: uses auth if specified', async () => {
      const restFetch = jest.fn();
      await setup({ productLabel: 'auth-product', useAuth: true, restFetch });
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: false }));
    });

    it('[use-auth]: skips auth by default', async () => {
      const restFetch = jest.fn();
      await setup({ productLabel: 'public-product', restFetch });
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: true }));
    });
  });
});
