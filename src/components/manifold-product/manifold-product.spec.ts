import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldProduct } from './manifold-product';
import { connections } from '../../utils/connections';
import { Product, Provider } from '../../spec/mock/catalog';
import { stub } from '../../../test-utils/stub-rest-fetch';

describe('<manifold-product>', () => {
  beforeEach(() => {
    stub(ManifoldProduct, {
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });
  });

  it('fetches the product by label on load', async () => {
    const productLabel = 'product-label';
    fetchMock.mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product]);
    fetchMock.mock(`${connections.prod.catalog}/providers/${Product.body.provider_id}`, [
      Product,
      Provider,
    ]);

    await newSpecPage({
      components: [ManifoldProduct],
      html: `
        <manifold-product
          product-label="${productLabel}"
        ></manifold-product>
      `,
    });

    expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
      true
    );
    expect(
      fetchMock.called(`${connections.prod.catalog}/providers/${Product.body.provider_id}`)
    ).toBe(true);
  });
});
