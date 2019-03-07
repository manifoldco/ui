import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

describe('<service-grid>', () => {
  it('displays all services', async () => {
    // Set properties and wait
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [
        { body: { name: 'footastic', tags: ['foo'] } },
        { body: { name: 'bartastic', tags: ['bar'] } },
        { body: { name: 'baztastic', tags: ['baz'] } },
      ];
    });
    await page.waitForChanges();

    // See if all categories are present
    const el = await page.findAll('service-grid >>> marketplace-results');
    expect(el.length).toBe(3);

    // Each category should have one card
    el.forEach(cat => {
      const card = cat.shadowRoot.querySelectorAll('service-card');
      expect(card.length).toBe(1);
    });
  });

  it('formats links correctly', async () => {
    // Set properties and wait
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [{ body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } }];
      elm.serviceLink = '/discover/view/service/:service';
    });
    await page.waitForChanges();

    // See if first <a> href matches the pattern
    const el = await page.find('service-grid >>> marketplace-results');
    const card = el.shadowRoot.querySelector('service-card');
    expect(card).not.toBeNull();

    if (card) {
      const href = card.getAttribute('service-link');
      expect(href).toBe('/discover/view/service/jawsdb-mysql');
    }
  });

  it('correctly filters results', async () => {
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [
        { body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } },
        { body: { name: 'LogDNA', tags: ['logging'], label: 'logdna' } },
      ];
    });
    await page.waitForChanges();

    const categories = await page.findAll('service-grid >>> marketplace-results');
    expect(categories.length).toEqual(2);

    const input = await page.find('service-grid >>> .search-bar');
    await input.press('KeyL');
    await input.press('KeyO');
    await input.press('KeyG');

    await page.waitForChanges();
    const results = await page.findAll('service-grid >>> marketplace-results');
    expect(results.length).toEqual(1);
  });

  it('correctly highlights featured services', async () => {
    // Set properties and wait
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [
        { body: { name: 'JawsDB MySQL', tags: ['db'], label: 'jawsdb-mysql' } },
        { body: { name: 'LogDNA', tags: ['logging'], label: 'logdna' } },
      ];
      elm.featured = 'fake,logdna,fake-2';
    });
    await page.waitForChanges();

    const el = await page.findAll('service-grid >>> marketplace-results');
    const jawsDB = el[0].shadowRoot.querySelector('service-card');
    const logDNA = el[1].shadowRoot.querySelector('service-card');
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
