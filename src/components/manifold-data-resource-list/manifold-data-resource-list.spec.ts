import { Resource } from '../../spec/mock/marketplace';
import { ManifoldDataResourceList } from './manifold-data-resource-list';

describe('<manifold-data-resource-list>', () => {
  it('filters user-only resources', () => {
    const resourceList = new ManifoldDataResourceList();

    const userResource1 = { ...Resource, body: { ...Resource.body, owner_id: undefined } };
    const userResource2 = { ...Resource, body: { ...Resource.body, user_id: undefined } };
    const teamResource1 = {
      ...Resource,
      body: {
        ...Resource.body,
        owner_id: undefined,
        team_id: Resource.body.user_id,
        user_id: undefined,
      },
    };
    const teamResource2 = {
      ...Resource,
      body: {
        ...Resource.body,
        owner_id: `manifold.co/team/${Resource.body.user_id}`,
        team_id: undefined,
        user_id: undefined,
      },
    };
    const badResource = {
      ...Resource,
      body: { ...Resource.body, owner_id: undefined, user_id: undefined, team_id: undefined },
    };

    const resources = [userResource1, userResource2, teamResource1, teamResource2, badResource];
    expect(resourceList.userResources(resources)).toEqual([userResource1, userResource2]);
  });
});
