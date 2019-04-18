import { newE2EPage } from '@stencil/core/testing';

describe('<manifold-data-product-name>', () => {
  it('displays a loading state in the form of a slot', async () => {
    const loading = '<img src="loading.gif" />';
    const page = await newE2EPage({
      html: `<manifold-data-product-name>${loading}</manifold-data-product-name>`,
    });
    const el = await page.find('manifold-data-product-name');
    expect(el).toEqualHtml(
      `<manifold-data-product-name class="hydrated">${loading}</manifold-data-product-name>`
    );
  });
});
