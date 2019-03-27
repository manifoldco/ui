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
        value: {
          label: '1',
          name: '1',
          numeric_details: { min: 0, max: 10, increment: 2, suffix: 'GB' },
        },
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

    const select = await page.find('plan-details >>> mf-select');
    expect(select).not.toBeNull();
  });

  it('renders mf-number-input if number feature present', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });

    const props = { plan: numberPlan, product: Product };
    await page.$eval(
      'plan-details',
      (elm: any, { plan, product }: any) => {
        elm.plan = plan;
        elm.product = product;
      },
      props
    );

    await page.waitForChanges();

    const numberInput = await page.find('plan-details >>> mf-number-input');
    expect(numberInput).not.toBeNull();
  });

  it('renders mf-toggle if boolean feature present', async () => {
    const page = await newE2EPage({ html: `<plan-details />` });

    const props = { plan: booleanPlan, product: Product };
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
