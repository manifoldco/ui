import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import resource from '../../spec/mock/elegant-cms/resource';
import { ResourceWithOwnerQuery } from '../../types/graphql';
import { ManifoldResourceProduct } from './manifold-resource-product';
import { ManifoldProductCardView } from '../manifold-product-card-view/manifold-product-card-view';

interface Props {
  gqlData?: ResourceWithOwnerQuery['resource'];
  loading?: boolean;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourceProduct, ManifoldProductCardView],
    html: '<div></div>',
  });

  const component = page.doc.createElement('manifold-resource-product');
  component.gqlData = props.gqlData;
  component.loading = props.loading;

  const root = page.root as HTMLDivElement;
  root.appendChild(component);
  await page.waitForChanges();

  return { page, component };
}

describe('<manifold-resource-product>', () => {
  beforeEach(() => {
    fetchMock.mock('begin:https://analytics.manifold.co', 200);
    fetchMock.mock('begin:https://api.manifold.co', 200);
  });

  afterEach(fetchMock.restore);

  it('[gqlData]: renders a skeleton if missing', async () => {
    const { page } = await setup({});

    const serviceCard = page.root && page.root.querySelector('manifold-product-card-view');
    const skeleton =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('manifold-skeleton-text');

    expect(skeleton).not.toBeNull();
  });

  it('[gqlData]: renders a product', async () => {
    const { page } = await setup({
      loading: false,
      gqlData: resource as ResourceWithOwnerQuery['resource'],
    });

    const serviceCard = page.root && page.root.querySelector('manifold-product-card-view');
    const productName =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('[itemprop="name"]');

    expect(productName).not.toBeNull();
  });

  it('[loading]: renders a skeleton', async () => {
    const { page } = await setup({
      loading: true,
      gqlData: resource as ResourceWithOwnerQuery['resource'],
    });

    const serviceCard = page.root && page.root.querySelector('manifold-product-card-view');
    const skeleton =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('manifold-skeleton-text');

    expect(skeleton).not.toBeNull();
  });
});
