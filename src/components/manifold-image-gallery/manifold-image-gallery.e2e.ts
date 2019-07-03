import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const images = [
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss1.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss2.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss3.PNG',
  'https://cdn.manifold.co/providers/jawsdb/screenshots/ss4.PNG',
];

describe('<manifold-image-gallery>', () => {
  it('displays the first image by default', async () => {
    const page = await newE2EPage({ html: `<manifold-image-gallery />` });
    await page.$eval(
      'manifold-image-gallery',
      (elm: any, props: any) => {
        elm.images = props.images;
      },
      { images }
    );
    await page.waitForChanges();
    const el = await page.find('manifold-image-gallery >>> img[data-test="display-image"]');
    expect(el.getAttribute('src')).toBe(images[0]);
  });

  it('displays the image thumbnails', async () => {
    const page = await newE2EPage({ html: `<manifold-image-gallery />` });
    await page.$eval(
      'manifold-image-gallery',
      (elm: any, props: any) => {
        elm.images = props.images;
      },
      { images }
    );
    await page.waitForChanges();
    const els = await page.findAll('manifold-image-gallery >>> img[data-test="thumbnail"]');
    expect(els.length).toBe(4);
  });
});
