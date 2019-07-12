import { convertPlan, convertProduct } from './gatewayToCatalog';
import { ResolvedPlan, ResolvedProduct } from '../spec/mock/gateway';

describe('The convertPlan method', () => {
  it('will transform a gateway plan into a valid catalog plan', () => {
    const productId = ResolvedProduct.id || '';
    const providerId = ResolvedProduct.provider ? ResolvedProduct.provider.id : '';
    expect(convertPlan(ResolvedPlan, productId, providerId || '')).toMatchSnapshot();
  });
});

describe('The convertProduct method', () => {
  it('will transform a gateway product into a valid catalog product', () => {
    expect(convertProduct(ResolvedProduct)).toMatchSnapshot();
  });
});
