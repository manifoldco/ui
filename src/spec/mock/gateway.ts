import { Product, ExpandedPlan, Regions, Provider } from './catalog';
import { Resource } from './marketplace';
import { Gateway } from '../../types/gateway';

export const ResolvedProvider: Gateway.ResolvedProvider = {
  id: Provider.id,
  label: Provider.body.label,
  name: Provider.body.name,
};

export const ResolvedProduct: Gateway.ResolvedProduct = {
  id: Product.id,
  ...Product.body,
  state: 'available',
  terms: {
    provided: Product.body.terms.provided,
    url: Product.body.terms.url || '',
  },
  billing: {
    currency: 'usd',
    type: 'monthly-prorated',
  },
  integration: {
    ...Product.body.integration,
    provisioning: 'public',
  },
  provider: ResolvedProvider,
};

export const ResolvedPlan: Gateway.ResolvedPlan = {
  id: ExpandedPlan.id,
  ...ExpandedPlan.body,
  free: ExpandedPlan.body.free || true,
};

export const ResolvedRegion: Gateway.ResolvedRegion = {
  id: Regions[0].id,
  name: Regions[0].body.name,
};

export const GatewayResource: Gateway.Resource = {
  id: Resource.id,
  ...Resource.body,
  type: 'resource',
  owner: {
    id: '1',
    name: 'test',
    type: 'user',
  },
  product: ResolvedProduct,
  plan: ResolvedPlan,
  region: ResolvedRegion,
  features: [],
};
