import { newE2EPage } from '@stencil/core/testing';

const Product: any = {
  id: '234qkjvrptpy3thna4qttwt7m2nf6',
  displayName: 'LogDNA',
  tagline: 'Real-time log aggregation, monitoring, and analysis from any platform, at any volume',
  label: 'logdna',
  logoUrl: 'https://cdn.manifold.co/providers/logdna/logos/ftzzxwdr0c8wx6gh0ntf83fq4w.png',
  plans: {
    edges: [{ node: { free: true } }, { node: { free: false } }],
  },
};

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

describe('<manifold-service-card>', () => {
  it('displays skeleton component initially', async () => {
    const page = await newE2EPage({ html: `<manifold-service-card></manifold-service-card>` });
    await page.waitForChanges();
    const card = await page.find('manifold-service-card-view');
    const isSkeleton = await card.getProperty('skeleton');
    expect(isSkeleton).toBe(true);
  });

  it('passes down product props to service card view', async () => {
    const requiredProps = {
      description: Product.tagline,
      logo: Product.logoUrl,
      name: Product.displayName,
      productLabel: Product.label,
    };

    const page = await newE2EPage({
      html: `<manifold-service-card></manifold-service-card>`,
    });
    await page.$eval(
      'manifold-service-card',
      (elm: any, props: any) => {
        elm.product = props.product;
      },
      { product: Product }
    );
    await page.waitForChanges();
    const card = await page.find('manifold-service-card-view');

    Object.entries(requiredProps).forEach(async ([prop, expectedValue]) => {
      const passedValue = await card.getProperty(prop);
      expect(passedValue).toBe(expectedValue);
    });
  });

  describe('v0 API', () => {
    it('[product-link-format]: it formats links correctly', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card></manifold-service-card>`,
      });
      await page.$eval(
        'manifold-service-card',
        (elm: any, props: any) => {
          elm.product = props.product;
          elm.productLinkFormat = `/product/:product`;
        },
        { product: Product }
      );
      await page.waitForChanges();

      const link = await page.find('manifold-service-card-view >>> a');
      const href = link.getAttribute('href');
      expect(href).toBe(`/product/${Product.label}`);
    });

    it('[preserve-event]: it passes result to child', async () => {
      const page = await newE2EPage({
        html: `<manifold-service-card></manifold-service-card>`,
      });
      await page.$eval(
        'manifold-service-card',
        (elm: any, props: any) => {
          elm.product = props.product;
          elm.preserveEvent = true;
        },
        { product: Product }
      );
      await page.waitForChanges();

      const card = await page.find('manifold-service-card-view');
      const preserveEvent = await card.getProperty('preserveEvent');
      expect(preserveEvent).toBe(true);
    });
  });
});
