import { newE2EPage } from '@stencil/core/testing';
import { Product } from '../../types/graphql';
import { product } from '../../spec/mock/graphql';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const productWithoutScreenshots: Product = {
  ...product,
  screenshots: [],
};

describe(`<manifold-product-details>`, () => {
  it('displays product tagline', async () => {
    const page = await newE2EPage({ html: `<manifold-product-details />` });
    await page.$eval(
      'manifold-product-details',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product }
    );
    await page.waitForChanges();

    const element = await page.find('manifold-product-details >>> .tagline');
    const value = await element.innerText;
    expect(value).toBe(product.tagline);
  });

  it('display screenshots section when there are no images', async () => {
    const page = await newE2EPage({ html: `<manifold-product-details />` });
    await page.$eval(
      'manifold-product-details',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product }
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
