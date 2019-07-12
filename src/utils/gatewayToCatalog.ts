import { Gateway } from '../types/gateway';
import { Catalog } from '../types/catalog';
import { globalRegion } from '../data/region';

export const convertPlan = (plan: Gateway.ResolvedPlan, productId: string, providerId: string): Catalog.Plan => ({
  id: plan.id || '',
  body: {
    ...plan,
    product_id: productId,
    provider_id: providerId,
    regions: [globalRegion.id], // TODO: Until we get graphQL, we're going to lose regions
  },
  version: 1,
  type: 'plan',
});

export const convertProduct = (product: Gateway.ResolvedProduct): Catalog.Product => ({
  id: product.id || '',
  version: 1,
  type: 'product',
  body: {
    ...product,
  },
});
