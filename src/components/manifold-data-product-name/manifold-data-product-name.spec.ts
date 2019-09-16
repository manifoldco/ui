import { newSpecPage, SpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';
import { ManifoldDataProductName } from './manifold-data-product-name';
import { createGraphqlFetch } from '../../utils/graphqlFetch';

const products = {
  jawsdb: 'JawsDB Postgres',
  logdna: 'LogDNA',
  mailgun: 'Mailgun',
};

const graphqlEndpoint = 'http://test.com/graphql';

describe('<manifold-data-product-name>', () => {
  describe('v0 API', () => {
    let page: SpecPage;
    let element: HTMLManifoldDataProductNameElement;

    beforeEach(async () => {
      // setup
      page = await newSpecPage({
        components: [ManifoldDataProductName],
        html: `<div></div>`,
      });
      element = page.doc.createElement('manifold-data-product-name');
      element.graphqlFetch = createGraphqlFetch({
        endpoint: () => graphqlEndpoint,
        getAuthToken: jest.fn(() => '1234'),
        wait: () => 10,
        setAuthToken: jest.fn(),
      });

      fetchMock.reset();

      fetchMock.mock(graphqlEndpoint, (_, req) => {
        const body = (req.body && req.body.toString()) || '';
        let product;
        // fake the product query here
        if (body.includes('jawsdb')) {
          product = { displayName: products.jawsdb };
        } else if (body.includes('logdna')) {
          product = { displayName: products.logdna };
        } else if (body.includes('mailgun')) {
          product = { displayName: products.mailgun };
        }

        // if querying resource, return resource
        if (body.includes('resource')) {
          return product
            ? { data: { resource: { plan: { product } } } }
            : { data: null, errors: [{ message: 'resource not found' }] };
        }
        // otherwise return product
        return product
          ? { data: { product } }
          : { data: null, errors: [{ message: 'product not found' }] };
      });
    });

    it('[product-name]: displays name to user', async () => {
      element.productLabel = 'jawsdb-postgres';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      // test initial render
      const name = root.querySelector('manifold-data-product-name') as HTMLElement;
      expect(name.innerHTML).toBe(products.jawsdb);

      // test for change, too
      element.productLabel = 'mailgun';
      await page.waitForChanges();
      expect(name.innerHTML).toBe(products.mailgun);
    });

    it('[product-name]: displays error', async () => {
      element.productLabel = 'bad-product';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      const name = root.querySelector('manifold-data-product-name') as HTMLElement;
      expect(name.innerHTML).toBe('Product name not found');
    });

    it('[resource-label]: displays name to user', async () => {
      element.resourceLabel = 'resource-jawsdb-postgres';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      // test initial render
      const name = root.querySelector('manifold-data-product-name') as HTMLElement;
      expect(name.innerHTML).toBe(products.jawsdb);

      // test for change, too
      element.resourceLabel = 'resource-mailgun';
      await page.waitForChanges();
      expect(name.innerHTML).toBe(products.mailgun);
    });

    it('[resource-label]: displays error', async () => {
      element.resourceLabel = 'bad-product';
      const root = page.root as HTMLElement;
      root.appendChild(element);
      await page.waitForChanges();

      const name = root.querySelector('manifold-data-product-name') as HTMLElement;
      expect(name.innerHTML).toBe('Product name not found');
    });
  });
});
