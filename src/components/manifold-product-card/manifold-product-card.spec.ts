import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { ManifoldProductCard } from './manifold-product-card';
import { ManifoldProductCardView } from '../manifold-product-card-view/manifold-product-card-view';
import { createGraphqlFetch } from '../../utils/graphqlFetch';
import product from '../../spec/mock/logdna/product';

const graphqlEndpoint = 'http://test.com/graphql';

interface Props {
  preserveEvent?: boolean;
  productLabel?: string;
  productLinkFormat?: string;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldProductCard, ManifoldProductCardView],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-product-card');
  component.graphqlFetch = createGraphqlFetch({
    endpoint: () => graphqlEndpoint,
  });
  component.productLabel = props.productLabel;
  component.productLinkFormat = props.productLinkFormat;
  component.preserveEvent = props.preserveEvent;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-product-card>', () => {
  beforeEach(async () => fetchMock.mock(graphqlEndpoint, { data: { product } }));
  afterEach(fetchMock.restore);

  describe('v0 props', () => {
    it('[product-label]: fetches if given', async () => {
      await setup({ productLabel: 'new-product' });
      expect(fetchMock.called(`begin:${graphqlEndpoint}`)).toBe(true);
    });

    it('[product-link-format]: formats links correctly', async () => {
      const { page } = await setup({
        productLabel: product.label,
        productLinkFormat: '/product/:product',
      });

      const view = page.root && page.root.querySelector('manifold-product-card-view');
      const link = view && view.shadowRoot && view.shadowRoot.querySelector('a');
      const href = link && link.getAttribute('href');
      expect(href).toBe(`/product/${product.label}`);
    });

    it('[preserve-event]: it passes result to child', async () => {
      const { page } = await setup({
        productLabel: 'my-product',
        productLinkFormat: '/product/:product',
        preserveEvent: true,
      });
      const view = page.root && page.root.querySelector('manifold-product-card-view');
      expect(view && view.preserveEvent).toBe(true);
    });
  });
});
