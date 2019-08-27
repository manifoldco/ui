import fetchMock from 'fetch-mock';
import { Marketplace } from '@manifoldco/ui/dist/types/types/marketplace';
import { Provisioning } from '@manifoldco/ui/dist/types/types/provisioning';

const resources: Marketplace.Resource[] = [
  {
    id: '1',
    type: 'resource',
    version: 1,
    body: {
      label: 'logging',
      name: 'Logging',
      product_id: '234qkjvrptpy3thna4qttwt7m2nf6',
      plan_id: '2351u7mty4bkwtwqdvzmbmw1w63w2',
      region_id: '1234',
      source: 'catalog',
      owner_id: '/user/1234',
      features: {},
      created_at: '',
      updated_at: '',
    },
  },
  {
    id: 'provisioning',
    type: 'resource',
    version: 1,
    body: {
      label: 'cms',
      name: 'CMS',
      product_id: '234qqzb2wm6gavkvaqr9e6b54j9dg',
      plan_id: '2351kz26adxddkbewu644wx4b186y',
      region_id: '1234',
      source: 'catalog',
      owner_id: '/user/1234',
      features: {},
      created_at: '',
      updated_at: '',
    },
  },
  {
    id: 'deprovisioning',
    type: 'resource',
    version: 1,
    body: {
      label: 'test',
      name: 'Test',
      product_id: '234qkjvrptpy3thna4qttwt7m2nf6',
      plan_id: '2351u7mty4bkwtwqdvzmbmw1w63w2',
      region_id: '1234',
      source: 'catalog',
      owner_id: '/user/1234',
      features: {},
      created_at: '',
      updated_at: '',
    },
  },
];

const operations: Provisioning.Operation[] = [
  {
    id: '1',
    version: 1,
    type: 'operation',
    body: {
      resource_id: 'provisioning',
      name: 'CMS',
      label: 'cms',
      state: 'provision',
      type: 'provision',
      product_id: '234qqzb2wm6gavkvaqr9e6b54j9dg',
      plan_id: '2351kz26adxddkbewu644wx4b186y',
      region_id: '1234',
      user_id: '/user/1234',
      message: 'provisioning',
    } as Provisioning.provision,
  },
  {
    id: '2',
    version: 1,
    type: 'operation',
    body: {
      resource_id: 'deprovisioning',
      user_id: '/user/1234',
      message: 'deprovisioning',
      type: 'deprovision',
      state: 'deprovision',
    } as Provisioning.deprovision,
  },
];

export const mockResources = () => {
  fetchMock.mock('express:/v1/resources/', resources);
  fetchMock.mock('express:/v1/operations/', operations);
};
