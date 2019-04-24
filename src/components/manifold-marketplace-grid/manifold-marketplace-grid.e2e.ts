import { newE2EPage } from '@stencil/core/testing';
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

describe('manifold-marketplace-grid', () => {
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

    expect(await page.findAll(`manifold-marketplace-grid >>> manifold-service-card`)).toHaveLength(
      services.length
    );
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
    expect(await page.findAll(`manifold-marketplace-grid >>> manifold-template-card`)).toHaveLength(
      categoriesWithTemplates.length
    );
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
    notExcluded.forEach(async product =>
      expect(
        await page.find(`manifold-marketplace-grid >>> [data-label="${product}"]`)
      ).not.toBeNull()
    );
    excludes.forEach(async product =>
      expect(await page.find(`manifold-marketplace-grid >>> [data-label="${product}"]`)).toBeNull()
    );
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

    const notIncluded = testCategories
      .map(category => `service-${category}`)
      .filter(category => !products.includes(category));
    notIncluded.forEach(async product =>
      expect(await page.find(`manifold-marketplace-grid >>> [data-label="${product}"]`)).toBeNull()
    );
    products.forEach(async product =>
      expect(
        await page.find(`manifold-marketplace-grid >>> [data-label="${product}"]`)
      ).not.toBeNull()
    );
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

    featured.forEach(async service => {
      const card = await page.find(`manifold-marketplace-grid >>> [data-label="${service}"]`);
      return expect(await card.getProperty('isFeatured')).toBe(true);
    });
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

    // This is just enough to only get `service-logging` to show (1)
    const input = await page.find('manifold-marketplace-grid >>> [type="search"]');
    await input.press('KeyL');
    await input.press('KeyO');
    await input.press('KeyG');

    expect(await page.findAll('manifold-marketplace-grid >>> manifold-service-card')).toHaveLength(
      1
    );

    // Also ensure category titles are hidden when searching
    expect(await page.findAll('manifold-marketplace-grid >>> [id^="category-"]')).toHaveLength(0);
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

    expect(await page.findAll('manifold-service-grid >>> manifold-template-card')).toHaveLength(0);
  });
});
