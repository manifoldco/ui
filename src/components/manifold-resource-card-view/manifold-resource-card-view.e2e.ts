import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

const name = 'my-resource';
const logo = 'https://cdn.manifold.co/providers/jawsdb/logos/80ca8b9113cf76fd.png';

describe('<manifold-resource-card>', () => {
  it('displays label', async () => {
    const page = await newE2EPage({
      html: `<manifold-resource-card-view label="${name}" resource-id="test" />`,
    });
    const el = await page.find('manifold-resource-card-view >>> [itemprop="name"]');

    expect(el.innerText).toBe(name);
  });

  it('displays logo', async () => {
    const page = await newE2EPage({
      html: `<manifold-resource-card-view logo="${logo}" resource-id="test" />`,
    });
    const el = await page.find('manifold-resource-card-view >>> manifold-lazy-image');
    const src = await el.getProperty('src');
    expect(src).toBe(logo);
  });

  it('displays the given status', async () => {
    const page = await newE2EPage({
      html: `<manifold-resource-card-view resource-status="provision" resource-id="test" />`,
    });
    const el = await page.find('manifold-resource-card-view >>> [itemprop="status"]');

    expect(el.innerText).toBe('Provision');
  });
});
