import { newE2EPage } from '@stencil/core/testing';
import {
  BooleanFeatureCustom,
  BooleanFeatureStaticFalse,
  BooleanFeatureStaticTrue,
  ExpandedPlan,
  ExpandedPlanCustom,
  NumberFeatureCustom,
  Product,
  StringFeatureCustom,
  StringFeatureStatic,
} from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign, @typescript-eslint/no-explicit-any */

const stringPlan: Catalog.ExpandedPlan = {
  ...ExpandedPlan,
  body: {
    ...ExpandedPlan.body,
    expanded_features: [
      { ...StringFeatureStatic, value: { ...StringFeatureStatic.value, name: 'Yes' } },
    ],
  },
};

const booleanPlanTrue: Catalog.ExpandedPlan = {
  ...ExpandedPlan,
  body: { ...ExpandedPlan.body, expanded_features: [BooleanFeatureStaticTrue] },
};

const booleanPlanFalse: Catalog.ExpandedPlan = {
  ...ExpandedPlan,
  body: { ...ExpandedPlan.body, expanded_features: [BooleanFeatureStaticFalse] },
};

const stringPlanCustom: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: { ...ExpandedPlanCustom.body, expanded_features: [StringFeatureCustom] },
};

const numberPlanCustom: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: { ...ExpandedPlanCustom.body, expanded_features: [NumberFeatureCustom] },
};

const booleanPlanCustom: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: { ...ExpandedPlanCustom.body, expanded_features: [BooleanFeatureCustom] },
};

describe(`<plan-details>`, () => {
  describe('static features', () => {
    it('sets data-value for string features', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: stringPlan, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const valueDisplay = await page.find('plan-details >>> .feature-value');
      const value = await valueDisplay.getAttribute('data-value');
      expect(value).toBe('Yes');
    });

    it('sets data-value for boolean features when true', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: booleanPlanTrue, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const valueDisplay = await page.find('plan-details >>> .feature-value');
      const value = await valueDisplay.getAttribute('data-value');
      expect(value).toBe('Yes');
    });

    it('sets data-value for boolean features when true', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: booleanPlanFalse, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const valueDisplay = await page.find('plan-details >>> .feature-value');
      const value = await valueDisplay.getAttribute('data-value');
      expect(value).toBe('No');
    });
  });

  describe('custom features', () => {
    it('renders mf-select if string feature present', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: stringPlanCustom, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const select = await page.find('plan-details >>> mf-select');
      expect(select).not.toBeNull();
    });

    it('renders mf-number-input if number feature present', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: numberPlanCustom, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const numberInput = await page.find('plan-details >>> mf-slider');
      expect(numberInput).not.toBeNull();
    });

    it('renders mf-toggle if boolean feature present', async () => {
      const page = await newE2EPage({ html: `<plan-details />` });

      const props = { plan: booleanPlanCustom, product: Product };
      await page.$eval(
        'plan-details',
        (elm: any, { plan, product }: any) => {
          elm.plan = plan;
          elm.product = product;
        },
        props
      );

      await page.waitForChanges();

      const toggle = await page.find('plan-details >>> mf-toggle');
      expect(toggle).not.toBeNull();
    });
  });
});
