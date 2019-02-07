import { newE2EPage } from '@stencil/core/testing';

const name = 'JawsDB MySQL';
const description = 'Fast, reliable, no-bullshark MySQL as a Service';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';
const tags = ['featured', 'new'];

describe('<service-card>', () => {
  it('displays name', async () => {
    const page = await newE2EPage();
    await page.setContent(`<service-card name="${name}"></service-card>`);
    const el = await page.find('service-card >>> [itemProp="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays description', async () => {
    const page = await newE2EPage();
    await page.setContent(`<service-card description="${description}"></service-card>`);
    const el = await page.find('service-card >>> [itemProp="description"]');

    expect(el.innerText).toBe(description);
  });

  it('displays logo', async () => {
    const page = await newE2EPage();
    await page.setContent(`<service-card logo="${logo}"></service-card>`);
    const el = await page.find('service-card >>> [itemProp="image"]');
    expect(el.getAttribute('src')).toBe(logo);
  });

  it('displays all tags', async () => {
    const page = await newE2EPage();
    await page.setContent(`<service-card tags="${tags.join(',')}"></service-card>`);
    const el = await page.findAll('service-card >>> .tag');
    expect(el.length).toBe(tags.length);
  });
});
