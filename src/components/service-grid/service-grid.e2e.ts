import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign */

describe('<service-grid>', () => {
  it('formats links correctly', async () => {
    // Set properties and wait
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [{ body: { label: 'jawsdb-mysql' } }];
      elm.serviceLink = '/discover/view/service/:service';
    });
    await page.waitForChanges();

    // See if first <a> href matches the pattern
    const el = await page.find('service-grid >>> service-card');
    const href = await el.getAttribute('service-link');
    expect(href).toBe('/discover/view/service/jawsdb-mysql');
  });

  it('correctly highlights featured services', async () => {
    // Set properties and wait
    const page = await newE2EPage({ html: '<service-grid></service-grid>' });
    await page.$eval('service-grid', (elm: any) => {
      elm.services = [{ body: { label: 'jawsdb-mysql' } }, { body: { label: 'logdna' } }];
      elm.featured = 'fake,logdna,fake-2';
    });
    await page.waitForChanges();

    const el = await page.findAll('service-grid >>> service-card');
    const jawsIsFeatured = el[0].getAttribute('is-featured');
    const logDNAIsFeatured = el[1].getAttribute('is-featured');

    expect(await jawsIsFeatured).toBeFalsy(); // this will be missing or null or something
    expect(await logDNAIsFeatured).toBe(''); // HTML attributes will read as '' if preset (true)
  });
});
