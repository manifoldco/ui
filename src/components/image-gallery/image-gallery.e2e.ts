import { newE2EPage, E2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

const images = [
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
];

describe('<image-gallery>', () => {
  let page: E2EPage;

  beforeAll(async () => {
    page = await newE2EPage({
      html: `<image-gallery></image-gallery>`,
    });

    await page.$eval('image-gallery', (elm: any) => {
      elm.images = [
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
        'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
      ];
    });
    await page.waitForChanges();
  });

  it('displays the first image by default', async () => {
    const el = await page.find('image-gallery >>> img[data-test="display-image"]');
    expect(el.getAttribute('src')).toBe(images[0]);
  });

  it('displays the image thumbnails', async () => {
    const els = await page.findAll('image-gallery >>> img[data-test="thumbnail"]');
    expect(els.length).toBe(4);
  });
});
