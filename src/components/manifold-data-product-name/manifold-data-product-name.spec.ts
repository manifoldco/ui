import { ManifoldDataProductName } from './manifold-data-product-name';

const restFetch = jest.fn();
restFetch.mockImplementation(() => ({}));
const productName = new ManifoldDataProductName();
productName.restFetch = restFetch;

describe('<manifold-data-product-name>', () => {
  beforeEach(() => {
    productName.productLabel = undefined;
    productName.resourceLabel = undefined;
    restFetch.mockClear();
  });

  it('fetches product from label on load', () => {
    const productLabel = 'test-product';
    productName.productLabel = productLabel;
    productName.componentWillLoad();
    expect(restFetch).toHaveBeenCalledWith(
      expect.objectContaining({ endpoint: `/products?label=${productLabel}` })
    );
  });

  it('fetches product from label on change', () => {
    const newProduct = 'new-product';
    productName.productChange(newProduct);
    expect(restFetch).toHaveBeenCalledWith(
      expect.objectContaining({ endpoint: `/products?label=${newProduct}` })
    );
  });

  it('fetches resource on load', () => {
    const resourceLabel = 'my-resource';
    productName.resourceLabel = resourceLabel;
    productName.componentWillLoad();
    expect(restFetch).toHaveBeenCalledWith(
      expect.objectContaining({ endpoint: `/resources/me/${resourceLabel}` })
    );
  });

  it('fetches resource on change', () => {
    const newResource = 'new-resource';
    productName.resourceChange(newResource);
    expect(restFetch).toHaveBeenCalledWith(
      expect.objectContaining({ endpoint: `/resources/me/${newResource}` })
    );
  });

  describe('v0 API', () => {
    it('[use-auth]: uses auth if specified', async () => {
      // TODO: use newSpecPage
      productName.productLabel = 'auth-product';
      productName.useAuth = true;
      productName.componentWillLoad();
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: false }));
    });

    it('[use-auth]: skips auth by default', async () => {
      // TODO: use newSpecPage
      productName.productLabel = 'public-product';
      productName.useAuth = undefined;
      productName.componentWillLoad();
      expect(restFetch).toHaveBeenCalledWith(expect.objectContaining({ isPublic: true }));
    });
  });
});
