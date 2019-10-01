import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Resource } from '../../types/graphql';
import { ManifoldResourceProduct } from './manifold-resource-product';

const GraphqlResource = {
  id: '1234',
  plan: {
    id: '1234',
    product: {
      id: '1234',
      displayName: 'Product',
      tagline: 'Amazing product',
      label: 'product',
      logoUrl: 'https://fillmurray.com/200/200',
    },
  },
};

describe('<manifold-resource-product>', () => {
  let page: SpecPage;
  let element: HTMLManifoldResourceProductElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [ManifoldResourceProduct],
      html: `<div></div>`,
    });
    element = page.doc.createElement('manifold-resource-product');
  });

  it('Renders a skeleton if loading', async () => {
    element.loading = true;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
      <manifold-resource-product>
        <manifold-service-card-view description="This is a loading product..." logo="loading.jpg" name="loading..." skeleton="">
          <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      </manifold-resource-product>
    `);
  });

  it('Renders a product card if not loading', async () => {
    element.loading = false;
    element.gqlData = GraphqlResource as Resource;
    const root = page.root as HTMLElement;
    root.appendChild(element);

    await page.waitForChanges();

    expect(element).toEqualHtml(`
      <manifold-resource-product>
        <manifold-service-card-view description="Amazing product" logo="https://fillmurray.com/200/200" name="Product" productid="1234" productlabel="product">
            <manifold-forward-slot slot="cta"></manifold-forward-slot>
        </manifold-service-card-view>
      </manifold-resource-product>
    `);
  });
});
