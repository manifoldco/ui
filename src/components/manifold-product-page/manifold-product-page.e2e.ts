import { newE2EPage } from '@stencil/core/testing';
import { Product } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-product-page>', () => {
  it('formats links correctly', async () => {
    // Set properties and wait
    const page = await newE2EPage({
      html: '<manifold-product-page />',
    });
    await page.$eval('manifold-product-page', (elm: any) => {
      elm.product = { body: { label: 'iron_cache' } };
      elm.linkFormat = '/product/:product';
    });
    await page.waitForChanges();

    const el = await page.find('manifold-product-page >>> manifold-link-button');
    expect(await el.getProperty('href')).toBe('/product/iron_cache');
  });

  it('CTA is shown by default', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });

    const props = { product: Product };
    await page.$eval(
      'manifold-product-page',
      (elm: any, { product }: any) => {
        elm.product = product;
      },
      props
    );

    await page.waitForChanges();

    const button = await page.find('manifold-product-page >>> manifold-link-button');
    expect(button).toBeDefined();
  });

  it('CTA button hides with prop', async () => {
    const page = await newE2EPage({
      html: `<manifold-product-page />`,
    });

    const props = { product: Product };
    await page.$eval(
      'manifold-product-page',
      (elm: any, { product }: any) => {
        elm.product = product;
        elm.hideCta = true;
      },
      props
    );

    await page.waitForChanges();

    const button = await page.find('manifold-product-page >>> manifold-link-button');
    expect(button).toBeNull();
  });
});
