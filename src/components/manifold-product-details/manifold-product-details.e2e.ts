import { newE2EPage } from '@stencil/core/testing';
import { Catalog } from '../../types/catalog';
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
  it('displays product tagline', async () => {
    const page = await newE2EPage({ html: `<manifold-product-details />` });
    await page.$eval(
      'manifold-product-details',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const element = await page.find('manifold-product-details >>> .tagline');
    const value = await element.innerText;
    expect(value).toBe(Product.body.tagline);
  });

  it('display screenshots section when there are no images', async () => {
    const page = await newE2EPage({ html: `<manifold-product-details />` });
    await page.$eval(
      'manifold-product-details',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const element = await page.findAll('manifold-product-details >>> manifold-image-gallery');
    expect(element.length).toBe(1);
  });

  it('does NOT display screenshots section when there are no images', async () => {
    const page = await newE2EPage({ html: `<manifold-product-details />` });
    await page.$eval(
      'manifold-product-details',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: productWithoutScreenshots }
    );
    await page.waitForChanges();

    const element = await page.findAll('manifold-product-details >>> manifold-image-gallery');
    expect(element.length).toBe(0);
  });
});
