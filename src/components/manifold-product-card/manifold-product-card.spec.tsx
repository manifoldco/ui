import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Product } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';

import { ManifoldProductCard } from './manifold-product-card';

describe('<manifold-product-card>', () => {
  it('fetches product on load', () => {
    const productLabel = 'test-product';

    const provisionButton = new ManifoldProductCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productLabel = productLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith(productLabel);
  });

  it('fetches product on change', () => {
    const newProduct = 'new-product';

    const provisionButton = new ManifoldProductCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productLabel = 'old-product';

    provisionButton.productLabelChange(newProduct);
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith(newProduct);
  });

  describe('when created with a product label', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the products', async () => {
      const productLabel = 'test-product';

      fetchMock.mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product]);

      const page = await newSpecPage({
        components: [ManifoldProductCard],
        html: `
          <manifold-product-card
            product-label="${productLabel}"
          ></manifold-product-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldProductCard;
      expect(root.product).toEqual(Product);
    });

    it('will do nothing if no product label is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/`, [Product]);

      await newSpecPage({
        components: [ManifoldProductCard],
        html: `
          <manifold-product-card></manifold-product-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/`)).toBe(false);
    });
  });
});
