import { ManifoldResourceCardView } from './manifold-resource-card-view';
import { Resource } from '../../spec/mock/marketplace';
import { Product } from '../../spec/mock/catalog';

describe('<manifold-resource-card>', () => {
  it('dispatches click event', () => {
    const serviceCard = new ManifoldResourceCardView();
    serviceCard.label = Resource.body.label;
    serviceCard.resourceId = Resource.id;
    serviceCard.logo = Product.body.logo_url;
    serviceCard.resourceStatus = 'available';

    const mock = { emit: jest.fn() };
    serviceCard.resourceClick = mock;

    serviceCard.onClick(new Event('click'));
    expect(mock.emit).toHaveBeenCalledWith({
      resourceId: Resource.id,
      resourceLabel: Resource.body.label,
    });
  });

  it('formats links correctly', () => {
    const serviceCard = new ManifoldResourceCardView();
    serviceCard.label = Resource.body.label;
    serviceCard.resourceId = Resource.id;
    serviceCard.logo = Product.body.logo_url;
    serviceCard.resourceStatus = 'available';
    serviceCard.resourceLinkFormat = '/resource/:resource';

    expect(serviceCard.href).toBe(`/resource/${Resource.body.label}`);
  });
});
