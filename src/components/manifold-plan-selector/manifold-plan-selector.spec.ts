import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { createRestFetch } from '../../utils/restFetch';
import { ManifoldPlanSelector } from './manifold-plan-selector';
import { ExpandedPlan } from '../../spec/mock/catalog';
import { Resource } from '../../spec/mock/marketplace';
import { connections } from '../../utils/connections';
import { Product } from '../../types/graphql';

const product: Partial<Product> = {
  id: '234w1jyaum5j0aqe3g3bmbqjgf20p',
  displayName: 'JawsDB MySQL',
  label: 'jawsdb-mysql',
  logoUrl: 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png',
};

const mockProduct = {
  data: {
    product,
  },
};

async function setup(productLabel?: string, resourceLabel?: string) {
  const page = await newSpecPage({
    components: [ManifoldPlanSelector],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-plan-selector');
  component.productLabel = productLabel;
  component.resourceLabel = resourceLabel;
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

describe('<manifold-plan-selector>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches product and plans by label on load, if given', async () => {
    const productLabel = 'test-label';
    fetchMock.mock(connections.prod.graphql, mockProduct);
    fetchMock.mock(`${connections.prod.catalog}/plans/?product_id=${mockProduct.data.product.id}`, [
      ExpandedPlan,
    ]);

    await setup(productLabel);

    expect(fetchMock.called(connections.prod.graphql)).toBe(true);
    expect(
      fetchMock.called(
        `${connections.prod.catalog}/plans/?product_id=${mockProduct.data.product.id}`
      )
    ).toBe(true);
  });

  it('fetches new product by label on change, if given', async () => {
    const newProduct = 'new-product';
    fetchMock.once('*', []);

    const { component, page } = await setup('old-product');

    fetchMock.mock(connections.prod.graphql, mockProduct);
    fetchMock.mock(`${connections.prod.catalog}/plans/?product_id=${mockProduct.data.product.id}`, [
      ExpandedPlan,
    ]);
    component.productLabel = newProduct;
    await page.waitForChanges();

    expect(fetchMock.called(connections.prod.graphql)).toBe(true);
    expect(
      fetchMock.called(
        `${connections.prod.catalog}/plans/?product_id=${mockProduct.data.product.id}`
      )
    ).toBe(true);
  });

  it('fetches resource on load by resource name, if given', async () => {
    const resourceLabel = 'my-resource';
    fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, [
      Resource,
    ]);
    fetchMock.mock(`${connections.prod.catalog}/plans/?product_id=${Resource.body.product_id}`, [
      ExpandedPlan,
    ]);

    await setup(undefined, resourceLabel);

    expect(
      fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
    ).toBe(true);
    expect(
      fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Resource.body.product_id}`)
    ).toBe(true);
  });

  it('fetches resource on change by resource name, if given', async () => {
    const newResource = 'new-resource';
    fetchMock.once('*', []);

    const { component, page } = await setup(undefined, 'old-resource');

    fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${newResource}`, [
      Resource,
    ]);
    fetchMock.mock(`${connections.prod.catalog}/plans/?product_id=${Resource.body.product_id}`, [
      ExpandedPlan,
    ]);
    component.resourceLabel = newResource;
    await page.waitForChanges();

    expect(
      fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${newResource}`)
    ).toBe(true);
    expect(
      fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Resource.body.product_id}`)
    ).toBe(true);
  });
});
