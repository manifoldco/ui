import { newE2EPage } from '@stencil/core/testing';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-toast>', () => {
  it('has a success style', async () => {
    const page = await newE2EPage({
      html: `<manifold-toast />`,
    });
    await page.$eval('manifold-toast', (elm: any) => {
      elm.alertType = 'success';
    });
    await page.waitForChanges();

    const el = await page.find('manifold-toast >>> [role="alert"]');
    expect(el.getAttribute('data-alert-type')).toBe('success');
  });

  it('has a warning style', async () => {
    const page = await newE2EPage({
      html: `<manifold-toast />`,
    });
    await page.$eval('manifold-toast', (elm: any) => {
      elm.alertType = 'warning';
    });
    await page.waitForChanges();

    const el = await page.find('manifold-toast >>> [role="alert"]');
    expect(el.getAttribute('data-alert-type')).toBe('warning');
  });

  it('has an error style', async () => {
    const page = await newE2EPage({
      html: `<manifold-toast />`,
    });
    await page.$eval('manifold-toast', (elm: any) => {
      elm.alertType = 'error';
    });
    await page.waitForChanges();

    const el = await page.find('manifold-toast >>> [role="alert"]');
    expect(el.getAttribute('data-alert-type')).toBe('error');
  });

  it('dismisses with a button', async () => {
    const page = await newE2EPage({
      html: `<manifold-toast />`,
    });
    await page.$eval('manifold-toast', (elm: any) => {
      elm.dismissable = true;
    });
    await page.waitForChanges();

    const btn = await page.find('manifold-toast >>> button');
    await btn.click();

    const el = await page.find('manifold-toast >>> [role="alert"]');
    expect(el.getAttribute('data-dismissed')).not.toBeNull();
  });
});
