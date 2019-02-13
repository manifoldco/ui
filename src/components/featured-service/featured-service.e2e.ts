import { newE2EPage, E2EPage } from '@stencil/core/testing';

const name = 'JawsDB MySQL';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';
const provider = 'JawsDB';
const bgColor = '#888888';

describe('<featured-service>', () => {
  let page: E2EPage;
  beforeAll(async () => {
    page = await newE2EPage({
      html: `<featured-service name="${name}" logo="${logo}" background-color="${bgColor}"><span itemprop="brand">${provider}</span></featured-service>`,
    });
  });

  it('displays the product/service name', async () => {
    const el = await page.find('featured-service >>> [itemprop="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays the product/service logo', async () => {
    const el = await page.find('featured-service >>> [itemprop="logo"]');

    expect(el.getAttribute('src')).toBe(logo);
  });

  it('displays the product/service provider as a child of featured-service', async () => {
    const el = await page.find('featured-service [itemprop="brand"]');

    expect(el.innerText).toBe(provider);
  });
});
