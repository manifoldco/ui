import { newE2EPage } from '@stencil/core/testing';
import { ExpandedPlanCustom, Product } from '../../spec/mock/catalog';

/* eslint-disable no-param-reassign */

const stringPlan: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: {
    ...ExpandedPlanCustom.body,
    expanded_features: [
      {
        type: 'string',
        customizable: true,
        label: 'stringy',
        name: 'Stringy',
        value_string: 'Yes',
        value: { label: 'yes', name: 'Yes' },
      },
    ],
  },
};

const numberPlan: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: {
    ...ExpandedPlanCustom.body,
    expanded_features: [
      {
        type: 'number',
        customizable: true,
        label: 'numby',
        name: 'Numby',
        value_string: '1',
        value: { label: '1', name: '1' },
      },
    ],
  },
};

const booleanPlan: Catalog.ExpandedPlan = {
  ...ExpandedPlanCustom,
  body: {
    ...ExpandedPlanCustom.body,
    expanded_features: [
      {
        type: 'boolean',
        customizable: true,
        label: 'george-bool',
        name: 'George Bool',
        value_string: 'True',
        value: { label: 'true', name: 'True' },
      },
    ],
  },
};

describe(`<plan-details>`, () => {
  it('renders mf-select if string feature present', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });

    await page.$eval(
      'plan-details',
      (elm: any, { plan, product }: any) => {
        elm.plan = plan;
        elm.product = product;
      },
      { plan: stringPlan, product: Product }
    );

    await page.waitForChanges();

    const select = await page.find('plan-details >>> mf-select');
    expect(select).not.toBeNull();
  });

  it('renders mf-slider if number feature present', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });

    await page.$eval(
      'plan-details',
      (elm: any, { plan, product }: any) => {
        elm.plan = plan;
        elm.product = product;
      },
      { plan: numberPlan, product: Product }
    );

    await page.waitForChanges();

    const slider = await page.find('plan-details >>> mf-slider');
    expect(slider).not.toBeNull();
  });

  it('renders mf-toggle if boolean feature present', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });

    await page.$eval(
      'plan-details',
      (elm: any, { plan, product }: any) => {
        elm.plan = plan;
        elm.product = product;
      },
      { plan: booleanPlan, product: Product }
    );

    await page.waitForChanges();

    const toggle = await page.find('plan-details >>> mf-toggle');
    expect(toggle).not.toBeNull();
  });
});
