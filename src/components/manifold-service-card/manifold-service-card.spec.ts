import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldServiceCard } from './manifold-service-card';
import { connections } from '../../utils/connections';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const Product: any = {
  id: '234qkjvrptpy3thna4qttwt7m2nf6',
  displayName: 'LogDNA',
  tagline: 'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
  label: 'logdna',
  logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
  plans: {
    edges: [{ node: { free: true } }, { node: { free: false } }],
  },
};

describe('<manifold-service-card>', () => {
  let page: SpecPage;
  let card: HTMLManifoldServiceCardElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldServiceCard],
      html: `<div></div>`,
    });
    card = page.doc.createElement('manifold-service-card');
    card.graphqlFetch = createGraphqlFetch({
      getAuthToken: jest.fn(() => '1234'),
      wait: () => 10,
      setAuthToken: jest.fn(),
    });
  });

  afterEach(() => {
    fetchMock.restore();
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
    it('will fetch the products', async () => {
      const productLabel = 'test-product';

      fetchMock.mock(connections.prod.graphql, { data: { product: Product } });

      const root = page.root as HTMLElement;
      card.productLabel = productLabel;
      card.productLinkFormat = '/product/:product';
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(connections.prod.graphql)).toBe(true);

      expect(card.querySelector('manifold-service-card-view')).toEqualHtml(`
        <manifold-service-card-view
          description="${Product.tagline}"
          isfree=""
          logo="${Product.logoUrl}"
          name="${Product.displayName}"
          productid="${Product.id}"
          productlabel="${Product.label}"
          productlinkformat="${card.productLinkFormat}"
        >
          <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      `);
    });

    it('will show loading state if no product label is given', async () => {
      fetchMock.mock(connections.prod.graphql, { data: { product: Product } });

      const root = page.root as HTMLElement;
      root.appendChild(card);
      await page.waitForChanges();

      expect(fetchMock.called(connections.prod.graphql)).toBe(false);
      expect(card.querySelector('manifold-service-card-view')).toEqualHtml(`
        <manifold-service-card-view
          description="Awesome product description"
          logo="product.jpg"
          name="Awesome product"
          skeleton=""
        >
          <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      `);
    });
  });

  describe('when fetching if the product is free', () => {
    it('will set is free to false if no free plan is found', async () => {
      fetchMock.mock(connections.prod.graphql, {
        data: {
          product: {
            ...Product,
            plans: { edges: [Product.plans.edges[1]] },
          },
        },
      });

      const root = page.root as HTMLElement;
      card.productLabel = Product.label;
      root.appendChild(card);
      await page.waitForChanges();

      const rendered = card.querySelector('manifold-service-card-view');
      expect(rendered && rendered.attributes.getNamedItem('isfree')).toBe(null);
    });
  });
});
