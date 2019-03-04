import { newE2EPage } from '@stencil/core/testing';

const name = 'JawsDB MySQL';
const description = 'Fast, reliable, no-bullshark MySQL as a Service';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';

describe('<service-card>', () => {
  it('displays name', async () => {
    const page = await newE2EPage({ html: `<service-card name="${name}"></service-card>` });
    const el = await page.find('service-card >>> [itemprop="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays description', async () => {
    const page = await newE2EPage({
      html: `<service-card description="${description}"></service-card>`,
    });
    const el = await page.find('service-card >>> [itemprop="description"]');

    expect(el.innerText).toBe(description);
  });

  it('displays logo', async () => {
    const page = await newE2EPage({ html: `<service-card logo="${logo}"></service-card>` });
    const el = await page.find('service-card >>> [itemprop="image"]');
    const src = await el.getAttribute('src');
    expect(src).toBe(logo);
  });

  it('displays a featured tag if featured', async () => {
    const page = await newE2EPage({
      html: `<service-card is-featured="true"></service-card>`,
    });
    const el = await page.find('service-card >>> .tag');
    expect(el.innerText).toBe('featured');
  });

  it('has an is-custom class if custom', async () => {
    const page = await newE2EPage({
      html: `<service-card is-custom="true"></service-card>`,
    });
    const el = await page.find('service-card >>> .is-custom');
    expect(el).not.toBeNull();
  });
});
