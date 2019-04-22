import { ManifoldServiceCard } from './manifold-service-card';
import { Product } from '../../spec/mock/catalog';

it('dispatches click event', () => {
  const serviceCard = new ManifoldServiceCard();
  serviceCard.label = Product.body.label;
  serviceCard.productId = Product.id;
  serviceCard.logo = Product.body.logo_url;
  serviceCard.name = Product.body.name;
  serviceCard.description = Product.body.tagline;

  const mock = { emit: jest.fn() };
  serviceCard.marketplaceClick = mock;

  serviceCard.onClick(new Event('click'));
  expect(mock.emit).toHaveBeenCalledWith({
    productId: Product.id,
    productLabel: Product.body.label,
  });
});
