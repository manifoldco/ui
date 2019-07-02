import { ManifoldTemplateCard } from './manifold-template-card';

const category = 'authentication';

describe('<manifold-template-card>', () => {
  it('dispatches click event', () => {
    const serviceCard = new ManifoldTemplateCard();
    serviceCard.category = category;

    const mock = { emit: jest.fn() };
    serviceCard.templateClick = mock;

    serviceCard.onClick(new Event('click'));
    expect(mock.emit).toHaveBeenCalledWith({
      category,
    });
  });

  it('formats links correctly', () => {
    const serviceCard = new ManifoldTemplateCard();
    serviceCard.category = category;
    serviceCard.templateLinkFormat = '/custom/product/:template';

    expect(serviceCard.href).toBe(`/custom/product/${category}`);
  });
});
