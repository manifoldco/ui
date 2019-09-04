import { ManifoldDataResourceList } from './manifold-data-resource-list';
import { ResourceConnection } from '../../types/graphql';

const mockResources: ResourceConnection = {
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
  },
  edges: [
    {
      cursor: '1',
      node: {
        displayName: 'Resource Name',
        label: 'resource-label',
        id: '1234',
        owner: {
          id: '12345',
          // unsused owner data
          subject: '',
          platform: {
            id: '',
            domain: '',
          },
        },
      },
    },
    {
      cursor: '1',
      node: {
        displayName: 'Resource Without Owner',
        label: 'resource-without-owner',
        id: '1234',
      },
    },
  ],
};

describe('<manifold-data-resource-list>', () => {
  it('filters user-only resources', () => {
    const resourceList = new ManifoldDataResourceList();

    expect(resourceList.userResources(mockResources)).toEqual([mockResources.edges[0]]);
  });
});
