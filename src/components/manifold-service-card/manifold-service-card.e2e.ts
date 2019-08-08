import { newE2EPage } from '@stencil/core/testing';
import { Product } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-service-card>', () => {
  it('displays skeleton component initially', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card></manifold-service-card>` });
    await page.waitForChanges();
    const card = await page.find('manifold-service-card-view');
    const loading = await card.getProperty('loading');
    expect(loading).toBe(true);
  });

  it('formats links from products', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card is-free="false"></manifold-service-card>`,
    });
    await page.$eval(
      'manifold-service-card',
      (elm: any, props: any) => {
        elm.product = props.product;
        elm.productLinkFormat = '/product/:product';
      },
      { product: Product }
    );
    await page.waitForChanges();

    const link = await page.find('a');
    const href = await link.getAttribute('href');
    expect(href).toBe(`/product/${Product.body.label}`);
  });

  it('displays a free badge if marked as free', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card></manifold-service-card>`,
    });
    await page.$eval(
      'manifold-service-card',
      (elm: any, props: any) => {
        elm.isFree = true;
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();

    const tag = await page.find('manifold-service-card-view >>> [data-tag="free"]');
    expect(tag).not.toBeNull();
  });
});
