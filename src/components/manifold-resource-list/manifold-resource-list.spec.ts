import fetchMock from 'fetch-mock';

import { ManifoldResourceList } from './manifold-resource-list';
import { Marketplace } from '../../types/marketplace';
import { Provisioning } from '../../types/provisioning';
import { Resource } from '../../spec/mock/marketplace';
import { Product } from '../../spec/mock/catalog';

const resources: Marketplace.Resource[] = [
  {
    ...Resource,
    body: {
      ...Resource.body,
      product_id: Product.id,
    },
  },
];

const provisionOperation: Provisioning.Operation = {
  id: '1',
  body: {
    resource_id: Resource.id,
    user_id: '2',
    type: 'provision',
    state: 'provision',
  } as Provisioning.provision,
  type: 'operation',
  version: 1,
};

describe('<manifold-resource-list>', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('processes resources properly', async () => {
    fetchMock
      .mock('/resources/?me', resources)
      .mock('/products', [Product])
      .mock('/operations/?is_deleted=false', [provisionOperation]);

    const resourceList = new ManifoldResourceList();
    resourceList.connection = {
      provisioning: '',
      catalog: '',
      gateway: '',
      marketplace: '',
      billing: '',
    };

    await resourceList.fetchResources();

    expect(resourceList.resources).toHaveLength(1);
    expect(resourceList.resources).toEqual([
      {
        id: Resource.id,
        label: Resource.body.label,
        logo: Product.body.logo_url,
        status: 'provision',
      },
    ]);
  });
});
