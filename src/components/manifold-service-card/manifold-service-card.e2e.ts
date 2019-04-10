import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

const name = 'JawsDB MySQL';
const description = 'Fast, reliable, no-bullshark MySQL as a Service';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';

describe('<manifold-service-card>', () => {
  it('displays name', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card name="${name}" />` });
    const el = await page.find('manifold-service-card >>> [itemprop="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays description', async () => {
    const page = await newE2EPage({
      html: `<manifold-service-card description="${description}" />`,
    });
    const el = await page.find('manifold-service-card >>> [itemprop="description"]');

    expect(el.innerText).toBe(description);
  });

  it('displays logo', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card logo="${logo}" />` });
    const el = await page.find('manifold-service-card >>> [itemprop="image"]');
    const src = await el.getAttribute('src');
    expect(src).toBe(logo);
  });

  it('displays a featured tag if featured', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card is-featured />` });
    const el = await page.find('manifold-service-card >>> .tag');
    expect(el.innerText).toBe('featured');
  });

  it('has an is-custom class if custom', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card is-custom />` });
    const el = await page.find('manifold-service-card >>> .is-custom');
    expect(el).not.toBeNull();
  });

  it('doesn’t display “free” tag by default (when not featured)', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card />` });
    const el = await page.find('manifold-service-card >>> .tag');
    expect(el).toBeNull();
  });
});
