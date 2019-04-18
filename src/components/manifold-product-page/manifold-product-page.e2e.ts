import { newE2EPage } from '@stencil/core/testing';

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
});
