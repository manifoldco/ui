import { newE2EPage } from '@stencil/core/testing';
import { Catalog } from '../../types/catalog';
import { Product } from '../../spec/mock/catalog';
import serviceTemplates from '../../data/templates';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

// Note: these must be actual categories, to test service templates
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

const services: Catalog.Product[] = testCategories.map((category, index) => ({
  ...Product,
  id: `product-${index}`,
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
    const page = await newE2EPage({
      html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
    });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
      },
      { services }
    );
    await page.waitForChanges();
    const serviceCards = await page.findAll(
      'manifold-marketplace-grid >>> manifold-service-card-view'
    );
    expect(serviceCards).toHaveLength(services.length);
  });

  it('displays free products', async () => {
    const freeProducts = ['product-0', 'product-2', 'product-3']; // must be sequential

    const page = await newE2EPage({
      html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
    });
    await page.$eval(
      'manifold-marketplace-grid',
      (elm: any, props: any) => {
        elm.services = props.services;
        elm.freeProducts = props.freeProducts;
      },
      { freeProducts, services }
    );
    await page.waitForChanges();

    const cards = await page.findAll('manifold-marketplace-grid >>> manifold-service-card-view');
    const isFree = await Promise.all(
      cards.map(async card => {
        if (await card.getProperty('isFree')) {
          // we have to test the property because this shadow DOM isn’t fully initialized in this test
          return card.getProperty('productId');
        }
        return false;
      })
    );

    expect(isFree.filter(value => value)).toEqual(freeProducts);
  });

  describe('v0 API', () => {
    it('[excludes] accepts exclusion list of products', async () => {
      const excludes = ['service-messaging', 'service-optimization'];

      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

      const serviceCards = await page.findAll(
        `manifold-marketplace-grid >>> manifold-service-card-view`
      );
      const productLabels = await Promise.all(
        serviceCards.map(card => card.getProperty('productLabel'))
      );

      expect(productLabels).toEqual(notExcluded);
    });

    it('[featured] features specified products', async () => {
      const featured = ['service-database', 'service-logging'];

      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.featured = props.featured;
        },
        { services, featured }
      );
      await page.waitForChanges();

      const cards = await page.findAll('manifold-marketplace-grid >>> manifold-service-card-view');
      const isFeatured = await Promise.all(
        cards.map(async card => {
          if (await card.getProperty('isFeatured')) {
            // we have to test the property because this shadow DOM isn’t fully initialized in this test
            return card.getProperty('productLabel');
          }
          return false;
        })
      );
      expect(isFeatured.filter(value => value)).toEqual(featured);
    });

    it('[hide-categories] displays categories without', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

    it('[hide-categories] hides categories when specified', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

    it('[hide-search] shows search without', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

    it('[hide-search] hides when specified', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

    it('[hide-templates] displays service templates without', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

    it('[hide-templates] displays template cards when specified', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.hideTemplates = true;
        },
        { services }
      );
      await page.waitForChanges();
      const templateCards = await page.findAll(
        'manifold-marketplace-grid >>> manifold-template-card'
      );
      expect(templateCards).toHaveLength(0);
    });

    it('[preserve-event] passes value to service card', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.preserveEvent = true;
        },
        { services }
      );
      await page.waitForChanges();

      const card = await page.find('manifold-marketplace-grid >>> manifold-service-card-view');
      const preserveEvent = await card.getProperty('preserveEvent');
      expect(preserveEvent).toBe(true);
    });

    it('[products] only shows the ones specified', async () => {
      const products = ['service-ai-ml', 'service-utility'];

      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.products = props.products;
        },
        { services, products }
      );
      await page.waitForChanges();

      const serviceCards = await page.findAll(
        'manifold-marketplace-grid >>> manifold-service-card-view'
      );
      const productLabels = await Promise.all(
        serviceCards.map(card => card.getProperty('productLabel'))
      );

      expect(productLabels).toEqual(products);
    });

    it('[product-link-format] formats hrefs properly', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.productLinkFormat = '/product/:product';
        },
        { services }
      );
      await page.waitForChanges();

      const card = await page.find('manifold-marketplace-grid >>> manifold-service-card-view');
      const link = card.shadowRoot.querySelector('a');
      expect(link && link.getAttribute('href')).toBe(`/product/${services[0].body.label}`);
    });

    it('[template-link-format] formats hrefs properly', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
      await page.$eval(
        'manifold-marketplace-grid',
        (elm: any, props: any) => {
          elm.services = props.services;
          elm.templateLinkFormat = '/product/custom/:template';
        },
        { services }
      );
      await page.waitForChanges();

      const card = await page.find('manifold-marketplace-grid >>> manifold-template-card');
      // TODO: query <a> tag rather than property
      const templateLinkFormat = await card.getProperty('templateLinkFormat');
      expect(templateLinkFormat).toBe(`/product/custom/:template`);
    });
  });

  describe('searching', () => {
    it('searches for services', async () => {
      const page = await newE2EPage({
        html: `<manifold-marketplace-grid></manifold-marketplace-grid>`,
      });
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

      const serviceCards = await page.findAll(
        'manifold-marketplace-grid >>> manifold-service-card-view'
      );
      expect(serviceCards).toHaveLength(1);

      // Also ensure category titles are hidden when searching
      const categoryTitles = await page.findAll('manifold-marketplace-grid >>> [id^="category-"]');
      expect(categoryTitles).toHaveLength(0);
    });
  });
});
