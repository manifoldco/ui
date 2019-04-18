import { newE2EPage } from '@stencil/core/testing';

describe('<manifold-data-product-logo>', () => {
  it('displays a loading state in the form of a slot', async () => {
    const loading = '<img src="loading.gif" />';
    const page = await newE2EPage({
      html: `<manifold-data-product-logo>${loading}</manifold-data-product-logo>`,
    });
    const el = await page.find('manifold-data-product-logo');
    expect(el).toEqualHtml(
      `<manifold-data-product-logo class="hydrated">${loading}</manifold-data-product-logo>`
    );
  });
});
