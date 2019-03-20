import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

describe('<service-grid> collections', () => {
  it('displays collections', async () => {
    const page = await newE2EPage({
      html: '<mani-tunnel><service-grid></service-grid></mani-tunnel>',
    });
    await page.$eval('mani-tunnel', (elm: any) => {
      elm.services = [
        { body: { name: 'FooTastic', label: 'footastic', tags: ['foo'] } },
        { body: { name: 'BarTastic', label: 'bartastic', tags: ['bar'] } },
        { body: { name: 'BazTastic', label: 'baztastic', tags: ['baz'] } },
      ];

      elm.collections = [
        {
          labels: ['footastic', 'bartastic'],
          name: 'Your Missing Piece',
          icon: 'pie_chart',
          tagLine: "Just the service you've been waiting for",
        },
        {
          labels: ['baztastic'],
          name: 'New',
          icon: 'star',
          tagLine: 'Latest services to join the platform',
        },
      ];
    });

    await page.waitForChanges();

    const collections = await page.findAll('service-grid >>> marketplace-results');
    expect(collections.length).toBe(2);

    const missingPieceServices = await collections[0].findAll('service-card');
    expect(missingPieceServices.length).toBe(2);

    const newServices = await collections[1].findAll('service-card');
    expect(newServices.length).toBe(1);
  });
});

describe('<service-grid> sorted categories', () => {
  it('displays all services', async () => {
    // Set properties and wait
    const page = await newE2EPage({
      html: '<mani-tunnel><service-grid></service-grid></mani-tunnel>',
    });
    await page.$eval('mani-tunnel', (elm: any) => {
      elm.services = [
        { body: { name: 'footastic', tags: ['foo'] } },
        { body: { name: 'bartastic', tags: ['bar'] } },
        { body: { name: 'baztastic', tags: ['baz'] } },
      ];
    });
    await page.waitForChanges();
    const tab = await page.find('service-grid >>> #categorized');
    await tab.click();

    // See if all categories are present
    const categories = await page.findAll('service-grid >>> marketplace-results');
    expect(categories.length).toBe(3);

    // Each category should have one service card and one custom card
    categories.forEach(async cat => {
      const card = await cat.findAll('service-card');
      expect(card.length).toBe(2);
      expect(card[1].getAttribute('is-custom')).toBe('');
    });
  });

  it('formats links correctly', async () => {
    // Set properties and wait
    const page = await newE2EPage({
      html: '<mani-tunnel><service-grid></service-grid></mani-tunnel>',
    });
    await page.$eval('mani-tunnel', (elm: any) => {
      elm.services = [{ body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } }];
      elm.serviceLink = '/discover/view/service/:service';
    });
    await page.waitForChanges();
    const tab = await page.find('service-grid >>> #categorized');
    await tab.click();

    // See if first <a> href matches the pattern
    const el = await page.find('service-grid >>> marketplace-results');
    const card = await el.find('service-card');
    expect(card).not.toBeNull();

    if (card) {
      const href = card.getAttribute('service-link');
      expect(href).toBe('/discover/view/service/jawsdb-mysql');
    }
  });

  it('correctly filters results', async () => {
    const page = await newE2EPage({
      html: '<mani-tunnel><service-grid></service-grid></mani-tunnel>',
    });
    await page.$eval('mani-tunnel', (elm: any) => {
      elm.services = [
        { body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } },
        { body: { name: 'LogDNA', tags: ['logging'], label: 'logdna' } },
      ];
    });
    await page.waitForChanges();
    const tab = await page.find('service-grid >>> #categorized');
    await tab.click();

    const categories = await page.findAll('service-grid >>> marketplace-results');
    expect(categories.length).toEqual(2);

    const input = await page.find('service-grid >>> .search-bar');
    await input.press('KeyL');
    await input.press('KeyO');
    await input.press('KeyG');

    const results = await page.findAll('service-grid >>> marketplace-results');
    expect(results.length).toEqual(1);
  });

  it('correctly highlights featured services', async () => {
    // Set properties and wait
    const page = await newE2EPage({
      html: '<mani-tunnel><service-grid></service-grid></mani-tunnel>',
    });
    await page.$eval('mani-tunnel', (elm: any) => {
      elm.services = [
        { body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } },
        { body: { name: 'LogDNA', tags: ['logging'], label: 'logdna' } },
      ];
      elm.featured = 'fake,logdna,fake-2';
    });
    await page.waitForChanges();
    const tab = await page.find('service-grid >>> #categorized');
    await tab.click();

    const el = await page.findAll('service-grid >>> marketplace-results');
    const jawsDB = await el[0].find('service-card');
    const logDNA = await el[1].find('service-card');
    expect(jawsDB).not.toBeNull();
    expect(logDNA).not.toBeNull();

    if (jawsDB && logDNA) {
      const jawsIsFeatured = jawsDB.getAttribute('is-featured');
      const logDNAIsFeatured = logDNA.getAttribute('is-featured');

      expect(jawsIsFeatured).toBeFalsy(); // this will be missing or null or something
      expect(logDNAIsFeatured).toBe(''); // HTML attributes will read as '' if preset (true)
    }
  });
});
