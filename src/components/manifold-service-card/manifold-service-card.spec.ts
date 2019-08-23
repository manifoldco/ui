import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldServiceCard } from './manifold-service-card';
import { Product, ExpandedFreePlan, ExpandedPlan } from '../../spec/mock/catalog';
import { connections } from '../../utils/connections';
import { createRestFetch } from '../../utils/restFetch';

describe('<manifold-service-card>', () => {
  let page: SpecPage;
  let card: HTMLManifoldServiceCardElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldServiceCard],
      html: `<div></div>`,
    });
    card = page.doc.createElement('manifold-service-card');
    card.restFetch = createRestFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: 10,
      setAuthToken: jest.fn(),
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('fetches product by id on id change', () => {
    const newProduct = '5678';

    const provisionButton = new ManifoldServiceCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productId = '1234';

    provisionButton.productIdChange(newProduct);
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith({ id: newProduct });
  });

  it('fetches product by label on label change', () => {
    const newProduct = 'new-product';

    const provisionButton = new ManifoldServiceCard();
    provisionButton.fetchProduct = jest.fn();
    provisionButton.productLabel = 'old-product';

    provisionButton.productLabelChange(newProduct);
    expect(provisionButton.fetchProduct).toHaveBeenCalledWith({ label: newProduct });
  });

  describe('when created with a product label', () => {
    it('will fetch the products', async () => {
      const productLabel = 'test-product';

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const root = page.root as HTMLElement;
      card.productLabel = productLabel;
      card.productLinkFormat = '/product/:product';
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );

      expect(card.querySelector('manifold-service-card-view')).toEqualHtml(`
        <manifold-service-card-view
          description="${Product.body.tagline}"
          isfree=""
          logo="${Product.body.logo_url}"
          name="${Product.body.name}"
          productid="${Product.id}"
          productlabel="${Product.body.label}"
          productlinkformat="${card.productLinkFormat}"
        >
          <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      `);
    });

    it('will show loading state if no product label is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/`, [Product]);

      const root = page.root as HTMLElement;
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/products/`)).toBe(false);
      expect(card.querySelector('manifold-service-card-view')).toEqualHtml(`
        <manifold-service-card-view
          description="Awesome product description"
          logo="product.jpg"
          name="Awesome product"
          skeleton=""
        ></manifold-service-card-view>
      `);
    });
  });

  describe('when created with a product id', () => {
    it('will fetch the products', async () => {
      const productId = '1234';

      fetchMock
        .mock(`${connections.prod.catalog}/products/${productId}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const root = page.root as HTMLElement;
      card.productId = productId;
      card.productLinkFormat = '/product/:product';
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/products/${productId}`)).toBe(true);

      expect(card.querySelector('manifold-service-card-view')).toEqualHtml(`
        <manifold-service-card-view
          description="${Product.body.tagline}"
          isfree=""
          productid="${Product.id}"
          productlabel="${Product.body.label}"
          productlinkformat="${card.productLinkFormat}"
          logo="${Product.body.logo_url}"
          name="${Product.body.name}"
        >
          <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      `);
    });

    it('will do nothing if no product id is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/undefined`, [Product]);

      const root = page.root as HTMLElement;
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/products/`)).toBe(false);
      expect(card.querySelector('a')).toBe(null);
    });
  });

  describe('when fetching if the product is free', () => {
    it('will fetch the plans after the product has been fetched', async () => {
      fetchMock
        .mock(`${connections.prod.catalog}/products/${Product.id}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ExpandedFreePlan,
        ]);

      const root = page.root as HTMLElement;
      card.productId = Product.id;
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const rendered = card.querySelector('manifold-service-card-view');
      expect(rendered && rendered.attributes.getNamedItem('isfree')).toBeDefined();
    });

    it('will set is free to false if no free plan is found', async () => {
      fetchMock
        .mock(`${connections.prod.catalog}/products/${Product.id}`, Product)
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [ExpandedPlan]);

      const root = page.root as HTMLElement;
      card.productId = Product.id;
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const rendered = card.querySelector('manifold-service-card-view');
      expect(rendered && rendered.attributes.getNamedItem('isfree')).toBe(null);
    });
  });
});
