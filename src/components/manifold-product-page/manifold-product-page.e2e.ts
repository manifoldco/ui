import { newE2EPage } from '@stencil/core/testing';
import { Product } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-product-page>', () => {
  it('displays the product/service name', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const el = await page.find('manifold-product-page >>> [itemprop="name"]');
    expect(el.innerText).toBe(Product.body.name);
  });

  it('displays the product/service logo', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const el = await page.find('manifold-product-page >>> [itemprop="logo"]');
    expect(el.getAttribute('src')).toBe(Product.body.logo_url);
  });
});
