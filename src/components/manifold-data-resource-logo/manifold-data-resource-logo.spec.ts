import fetchMock from 'fetch-mock';
import { newSpecPage } from '@stencil/core/testing';
import { ManifoldDataResourceLogo } from './manifold-data-resource-logo';
import { Resource } from '../../spec/mock/marketplace';
import { Product } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';
import { createRestFetch } from '../../utils/restFetch';

async function setup(resourceLabel: string) {
  const page = await newSpecPage({
    components: [ManifoldDataResourceLogo],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-data-resource-logo');
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

describe('<manifold-data-resource-logo>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches resource on load', async () => {
    const resourceLabel = 'my-resource';
    fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`, [
      Resource,
    ]);
    fetchMock.mock(`${connections.prod.catalog}/products/${Resource.body.product_id}`, [Product]);

    await setup(resourceLabel);

    expect(
      fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${resourceLabel}`)
    ).toBe(true);
    expect(
      fetchMock.called(`${connections.prod.catalog}/products/${Resource.body.product_id}`)
    ).toBe(true);
  });

  it('fetches resource on change', async () => {
    const resourceLabel = 'my-resource';
    fetchMock.once('*', []);

    const { page, component } = await setup(resourceLabel);

    const newResourceLabel = 'new-resource';
    fetchMock.mock(`${connections.prod.marketplace}/resources/?me&label=${newResourceLabel}`, [
      Resource,
    ]);
    fetchMock.mock(`${connections.prod.catalog}/products/${Resource.body.product_id}`, [Product]);

    component.resourceLabel = newResourceLabel;
    await page.waitForChanges();

    expect(
      fetchMock.called(`${connections.prod.marketplace}/resources/?me&label=${newResourceLabel}`)
    ).toBe(true);
    expect(
      fetchMock.called(`${connections.prod.catalog}/products/${Resource.body.product_id}`)
    ).toBe(true);
  });
});
