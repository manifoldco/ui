import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldServiceCard } from './manifold-service-card';
import { Product, ExpandedFreePlan, ExpandedPlan } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';
import { createRestFetch } from '../../utils/restFetch';

/* eslint-disable @typescript-eslint/no-explicit-any */
const proto = ManifoldServiceCard.prototype as any;
const oldCallback = proto.componentWillLoad;

proto.componentWillLoad = function() {
  (this as any).restFetch = createRestFetch({
    getAuthToken: jest.fn(() => '1234'),
    wait: 10,
    setAuthToken: jest.fn(),
  });

  if (oldCallback) {
    oldCallback.call(this);
  }
};

describe('<manifold-service-card>', () => {
  it('dispatches click event', () => {
    const serviceCard = new ManifoldServiceCard();
    serviceCard.productLabel = Product.body.label;
    serviceCard.productId = Product.id;

    const mock = { emit: jest.fn() };
    serviceCard.marketplaceClick = mock;

    serviceCard.onClick(new Event('click'));
    expect(mock.emit).toHaveBeenCalledWith({
      productId: Product.id,
      productLabel: Product.body.label,
    });
  });

  it('formats links correctly', () => {
    const serviceCard = new ManifoldServiceCard();
    serviceCard.productLabel = Product.body.label;
    serviceCard.productId = Product.id;
    serviceCard.productLinkFormat = '/product/:product';

    expect(serviceCard.href).toBe(`/product/${Product.body.label}`);
  });

  it('fetches product by id on load', () => {
    const productId = '1234';

    const provisionButton = new ManifoldServiceCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productId = productId;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith(undefined, productId);
  });

  it('fetches product by label  on load', () => {
    const productLabel = 'test-product';

    const provisionButton = new ManifoldServiceCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productLabel = productLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith(productLabel);
  });

  it('fetches product by id on id change', () => {
    const newProduct = '5678';

    const provisionButton = new ManifoldServiceCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productId = '1234';

    provisionButton.productIdChange(newProduct);
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith(undefined, newProduct);
  });

  it('fetches product by label on label change', () => {
    const newProduct = 'new-product';

    const provisionButton = new ManifoldServiceCard();
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

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const page = await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card
            product-label="${productLabel}"
          ></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldServiceCard;
      expect(root.product).toEqual(Product);
    });

    it('will do nothing if no product label is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/`, [Product]);

      await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/`)).toBe(false);
    });
  });

  describe('when created with a product id', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the products', async () => {
      const productId = '1234';

      fetchMock
        .mock(`${connections.prod.catalog}/products/${productId}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const page = await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card
            product-id="${productId}"
          ></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/${productId}`)).toBe(true);

      const root = page.rootInstance as ManifoldServiceCard;
      expect(root.product).toEqual(Product);
    });

    it('will do nothing if no product id is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/undefined`, [Product]);

      await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/undefined`)).toBe(false);
    });
  });

  describe('when fetching if the product is free', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the plans after the product has been fetched', async () => {
      fetchMock
        .mock(`${connections.prod.catalog}/products/${Product.id}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const page = await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card
            product-id="${Product.id}"
          ></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldServiceCard;
      expect(root.isFree).toEqual(true);
    });

    it('will set is free to false if no free plan is found', async () => {
      fetchMock
        .mock(`${connections.prod.catalog}/products/${Product.id}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [ExpandedPlan]);

      const page = await newSpecPage({
        components: [ManifoldServiceCard],
        html: `
          <manifold-service-card
            product-id="${Product.id}"
          ></manifold-service-card>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldServiceCard;
      expect(root.isFree).toEqual(false);
    });
  });
});
