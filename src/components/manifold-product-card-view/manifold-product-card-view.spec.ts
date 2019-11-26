import { newSpecPage } from '@stencil/core/testing';
import { ManifoldProductCardView } from './manifold-product-card-view';

describe('<manifold-product-card-view-view>', () => {
  it('emits events on click', async () => {
    const mockClick = jest.fn();
    const page = await newSpecPage({
      components: [ManifoldProductCardView],
      html: `
        <manifold-product-card-view
          name="product-name"
          product-id="product-id"
          product-label="product-label"
        ></manifold-product-card-view>`,
    });
    const { doc, root } = page;
    doc.addEventListener('manifold-marketplace-click', mockClick);
    const link = root && root.shadowRoot && root.shadowRoot.querySelector('a');
    if (!link) {
      return;
    }
    link.click();
    expect(mockClick).toBeCalledWith(
      expect.objectContaining({
        detail: {
          productLabel: 'product-label',
          productName: 'product-name',
          productId: 'product-id',
        },
      })
    );
  });

  it('doesn’t emit events on click if given product-link-format', async () => {
    const mockClick = jest.fn();
    const page = await newSpecPage({
      components: [ManifoldProductCardView],
      html: `
        <manifold-product-card-view
          name="product-name"
          product-id="product-id"
          product-label="product-label"
          product-link-format="/product/:product"
        ></manifold-product-card-view>`,
    });
    const { doc, root } = page;
    doc.addEventListener('manifold-marketplace-click', mockClick);
    const link = root && root.shadowRoot && root.shadowRoot.querySelector('a');
    if (!link) {
      return;
    }
    link.click();
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('does emit events on click with product-link-format, if preserve-event is also passed', async () => {
    const mockClick = jest.fn();
    const page = await newSpecPage({
      components: [ManifoldProductCardView],
      html: `
        <manifold-product-card-view
          name="product-name"
          preserve-event
          product-id="product-id"
          product-label="product-label"
          product-link-format="/product/:product"
        ></manifold-product-card-view>`,
    });
    const { doc, root } = page;
    doc.addEventListener('manifold-marketplace-click', mockClick);
    const link = root && root.shadowRoot && root.shadowRoot.querySelector('a');
    if (!link) {
      return;
    }
    link.click();
    expect(mockClick.mock.calls[0][0].detail).toEqual({
      productLabel: 'product-label',
      productName: 'product-name',
      productId: 'product-id',
    });
  });
});
