import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import resource from '../../spec/mock/elegant-cms/resource';
import { GetResourceQuery } from '../../types/graphql';
import { ManifoldResourceProduct } from './manifold-resource-product';
import { ManifoldServiceCardView } from '../manifold-service-card-view/manifold-service-card-view';

interface Props {
  gqlData?: GetResourceQuery['resource'];
  loading?: boolean;
}

async function setup(props: Props) {
  const page = await newSpecPage({
    components: [ManifoldResourceProduct, ManifoldServiceCardView],
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

    const serviceCard = page.root && page.root.querySelector('manifold-service-card-view');
    const skeleton =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('manifold-skeleton-text');

    expect(skeleton).not.toBeNull();
  });

  it('[gqlData]: renders a product', async () => {
    const { page } = await setup({
      loading: false,
      gqlData: resource as GetResourceQuery['resource'],
    });

    const serviceCard = page.root && page.root.querySelector('manifold-service-card-view');
    const productName =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('[itemprop="name"]');

    expect(productName).not.toBeNull();
  });

  it('[loading]: renders a skeleton', async () => {
    const { page } = await setup({
      loading: true,
      gqlData: resource as GetResourceQuery['resource'],
    });

    const serviceCard = page.root && page.root.querySelector('manifold-service-card-view');
    const skeleton =
      serviceCard &&
      serviceCard.shadowRoot &&
      serviceCard.shadowRoot.querySelector('manifold-skeleton-text');

    expect(skeleton).not.toBeNull();
  });
});
