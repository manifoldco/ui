import { Marketplace } from '../../types/marketplace';

interface RealResource extends Marketplace.Resource {
  body: RealResourceBody;
}

interface RealResourceBody extends Marketplace.ResourceBody {
  team_id?: string;
  user_id?: string;
}

export const Resource: RealResource = {
  body: {
    annotations: { 'manifold.co/projects': ['test-project'] },
    created_at: '2019-04-25T22:11:06.691Z',
    label: 'logdna',
    features: {},
    name: 'Logdna',
    owner_id: 'manifold.co/user/20036wwe13rjxfnnj7fjqf2rq1ky0',
    plan_id: '23558gd5kaw5z462e3mvaknj5veuj',
    product_id: '234qkjvrptpy3thna4qttwt7m2nf6',
    project_id: '2699pkg97g1mf7kymzy4wah0uk2w8',
    region_id: '235n4f9pxf8eyraj3y159x89z6jer',
    source: 'catalog',
    updated_at: '2019-04-25T22:11:06.691Z',
    user_id: '20036wwe13rjxfnnj7fjqf2rq1ky0',
  },
  id: '26841468fmyhcn3h69ednm65knx44',
  type: 'resource',
  version: 1,
};

export const Credential: Marketplace.Credential = {
  body: {
    resource_id: '26841468fmyhcn3h69ednm65knx44',
    source: 'catalog',
    values: {
      TEST: 'test',
    },
    created_at: '2019-04-25T22:11:06.691Z',
    updated_at: '2019-04-25T22:11:06.691Z',
  },
  id: '26841468fmyhcn3h69ednm65knx44',
  type: 'credential',
  version: 1,
};
