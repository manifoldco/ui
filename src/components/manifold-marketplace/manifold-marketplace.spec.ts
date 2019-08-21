import { ManifoldMarketplace } from './manifold-marketplace';

const restFetch = jest.fn();
restFetch.mockImplementation(() => Promise.resolve([]));
const marketplace = new ManifoldMarketplace();
marketplace.restFetch = restFetch;

describe('<manifold-marketplace>', () => {
  describe('v0 API', () => {
    beforeEach(() => restFetch.mockClear());

    it('[use-auth]: uses auth if specified', async () => {
      // TODO: do this with newSpecPage
      marketplace.useAuth = true;
      await marketplace.fetchProducts();
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: false }));
    });

    it('[use-auth]: skips auth by default', async () => {
      // TODO: do this with newSpecPage
      marketplace.useAuth = undefined;
      await marketplace.fetchProducts();
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: true }));
    });
  });
});
