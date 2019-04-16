import { newE2EPage } from '@stencil/core/testing';
import { Product } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const productWithoutScreenshots: Catalog.Product = {
  ...Product,
  body: {
    ...Product.body,
    images: [],
  },
};

describe(`<manifold-product-details>`, () => {
  describe('static features', () => {
    it('displays product tagline', async () => {
      const page = await newE2EPage({ html: `<manifold-product-details />` });

      const props = { product: Product };
      await page.$eval(
        'manifold-product-details',
        (elm: any, { product }: any) => {
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const element = await page.find('manifold-product-details >>> .tagline');
      const value = await element.innerText;
      expect(value).toBe(Product.body.tagline);
    });

    it('display screenshots section when there are no images', async () => {
      const page = await newE2EPage({ html: `<manifold-product-details />` });

      const props = { product: Product };
      await page.$eval(
        'manifold-product-details',
        (elm: any, { product }: any) => {
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const element = await page.findAll('manifold-product-details >>> manifold-image-gallery');

      expect(element.length).toBe(1);
    });

    it('does NOT display screenshots section when there are no images', async () => {
      const page = await newE2EPage({ html: `<manifold-product-details />` });

      const props = { product: productWithoutScreenshots };
      await page.$eval(
        'manifold-product-details',
        (elm: any, { product }: any) => {
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const element = await page.findAll('manifold-product-details >>> manifold-image-gallery');

      expect(element.length).toBe(0);
    });
  });
});
