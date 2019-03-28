import { newE2EPage, E2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const name = 'JawsDB MySQL';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';
const provider = 'JawsDB';

describe('<manifold-featured-service>', () => {
  let page: E2EPage;
  beforeAll(async () => {
    page = await newE2EPage({
      html: `<manifold-featured-service><span itemprop="brand">${provider}</span></manifold-featured-service>`,
    });

    await page.$eval('manifold-featured-service', (elm: any) => {
      elm.name = 'JawsDB MySQL';
      elm.logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';
    });

    await page.waitForChanges();
  });

  it('displays the product/service name', async () => {
    const el = await page.find('manifold-featured-service >>> [itemprop="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays the product/service logo', async () => {
    const el = await page.find('manifold-featured-service >>> [itemprop="logo"]');

    expect(el.getAttribute('src')).toBe(logo);
  });

  it('displays the product/service provider as a child of manifold-featured-service', async () => {
    const el = await page.find('manifold-featured-service [itemprop="brand"]');

    expect(el.innerText).toBe(provider);
  });
});
