import { newE2EPage } from '@stencil/core/testing';
import { Catalog } from '../../types/catalog';
import { Product } from '../../spec/mock/catalog';
import serviceTemplates from '../../data/templates';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const testCategories: string[] = [
  'ai-ml',
  'authentication',
  'cms',
  'database',
  'logging',
  'memory-store',
  'messaging',
  'monitoring',
  'optimization',
  'search',
  'sell-your-service',
  'utility',
  'worker',
];

const services: Catalog.Product[] = testCategories.map(category => ({
  ...Product,
  body: {
    ...Product.body,
    name: `${Product.body.name} (${category})`,
    label: `service-${category}`, // service-ai-ml, service-authentication, …
    tags: [category],
  },
}));

const templateCategories: string[] = serviceTemplates.reduce(
  (categories: string[], { category }) =>
    !categories.includes(category) ? [...categories, category] : categories,
  []
);

const categoriesWithTemplates: string[] = testCategories.concat(
  templateCategories.filter(category => !testCategories.includes(category))
);

describe('<manifold-marketplace-grid>', () => {
  it('renders all services', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
      },
      { services }
    );
    await page.waitForChanges();
    const serviceCards = await page.findAll('manifold-marketplace-grid >>> manifold-service-card');
    expect(serviceCards).toHaveLength(services.length);
  });

  it('displays service template cards', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
      },
      { services }
    );
    await page.waitForChanges();

    // Note: <manifold-template-card> determines whether or not the card appears (if templates are empty), but we should still check to make sure it’s being rendered.
    const templateCards = await page.findAll(
      `manifold-marketplace-grid >>> manifold-template-card`
    );
    expect(templateCards).toHaveLength(categoriesWithTemplates.length);
  });

  it('hides template cards with hide-templates', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.hideTemplates = true;
      },
      { services }
    );
    await page.waitForChanges();
    const templateCards = await page.findAll('manifold-service-grid >>> manifold-template-card');
    expect(templateCards).toHaveLength(0);
  });

  it('accepts exclusion list of products', async () => {
    const excludes = ['service-messaging', 'service-optimization'];

    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.excludes = props.excludes;
      },
      { services, excludes }
    );
    await page.waitForChanges();

    const notExcluded = testCategories
      .map(category => `service-${category}`)
      .filter(category => !excludes.includes(category));

    const serviceCards = await page.findAll(`manifold-marketplace-grid >>> [data-label]`);
    const productLabels = await serviceCards.map(card => card.getAttribute('data-label'));

    expect(productLabels).toEqual(notExcluded);
  });

  it('accepts manual product list', async () => {
    const products = ['service-ai-ml', 'service-utility'];

    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.products = props.products;
      },
      { services, products }
    );
    await page.waitForChanges();

    const serviceCards = await page.findAll(`manifold-marketplace-grid >>> [data-label]`);
    const productLabels = await serviceCards.map(card => card.getAttribute('data-label'));

    expect(productLabels).toEqual(products);
  });

  it('features specified products', async () => {
    const featured = ['service-database', 'service-logging'];

    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.featured = props.featured;
      },
      { services, featured }
    );
    await page.waitForChanges();

    const serviceCards = await page.findAll(`manifold-marketplace-grid >>> [data-featured]`);
    const featuredServices = serviceCards.map(card => card.getAttribute('data-label'));
    expect(featuredServices).toEqual(featured);
  });

  it('displays categories by default', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
      },
      { services }
    );
    await page.waitForChanges();

    const categories = await page.findAll(`manifold-marketplace-grid >>> [id^="category-"]`);
    expect(categories.length).toBe(categoriesWithTemplates.length);
  });

  it('hides categories with hide-categories', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.hideCategories = true;
      },
      { services }
    );
    await page.waitForChanges();

    const categories = await page.findAll(`manifold-marketplace-grid >>> [id^="category-"]`);
    expect(categories.length).toBe(0);

    const templates = await page.findAll(`manifold-marketplace-grid >>> manifold-template-card`);
    expect(templates.length).toBe(0);
  });

  it('searches for services', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.hideCategories = true;
      },
      { services }
    );
    await page.waitForChanges();

    // This is just enough to only get `service-logging` to show (1)
    const input = await page.find('manifold-marketplace-grid >>> [type="search"]');
    await input.press('KeyL');
    await input.press('KeyO');
    await input.press('KeyG');

    const serviceCards = await page.findAll('manifold-marketplace-grid >>> manifold-service-card');
    expect(serviceCards).toHaveLength(1);

    // Also ensure category titles are hidden when searching
    const categoryTitles = await page.findAll('manifold-marketplace-grid >>> [id^="category-"]');
    expect(categoryTitles).toHaveLength(0);
  });

  it('shows the search bar by default', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
      },
      { services }
    );
    await page.waitForChanges();
    const search = await page.findAll('manifold-marketplace-grid >>> [type="search"]');
    expect(search).toHaveLength(1);
  });

  it('hides the search bar with hide-search', async () => {
    const page = await newE2EPage({ html: `<manifold-marketplace-grid />` });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.hideSearch = true;
      },
      { services }
    );
    await page.waitForChanges();
    const search = await page.findAll('manifold-marketplace-grid >>> [type="search"]');
    expect(search).toHaveLength(0);
  });
});
