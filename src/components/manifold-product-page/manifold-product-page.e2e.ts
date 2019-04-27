import { newE2EPage } from '@stencil/core/testing';
import { Product, Provider } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-product-page>', () => {
  it('formats links correctly', async () => {
    const page = await newE2EPage({ html: '<manifold-product-page />' });
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
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const button = await page.find('manifold-product-page >>> manifold-link-button');
    expect(button).toBeDefined();
  });

  it('CTA button hides with prop', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
        elm.hideCta = true;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const button = await page.find('manifold-product-page >>> manifold-link-button');
    expect(button).toBeNull();
  });

  it('displays the product/service name', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
        elm.hideCta = true;
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
        elm.hideCta = true;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const el = await page.find('manifold-product-page >>> [itemprop="logo"]');
    expect(el.getAttribute('src')).toBe(Product.body.logo_url);
  });

  it('displays the product/service provider as a child of manifold-featured-service', async () => {
    const page = await newE2EPage({ html: `<manifold-product-page />` });
    await page.$eval(
      'manifold-product-page',
      (elm: any, props: any) => {
        elm.product = props.product;
        elm.hideCta = true;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const el = await page.find('manifold-product-page >>> [itemprop="brand"]');
    expect(el.innerText).toBe(Provider.body.name);
  });
});
