import { newSpecPage } from '@stencil/core/testing';
import fetchMock from 'fetch-mock';

import { Product, ExpandedPlan, ZiggeoPlan } from '../../spec/mock/catalog';
import { GatewayResource } from '../../spec/mock/gateway';
import { connections } from '../../utils/connections';

import { ManifoldDataProvisionButton } from './manifold-data-provision-button';

describe('<manifold-data-provision-button>', () => {
  it('fetches product, plan and profile id on load', () => {
    const productLabel = 'test-product';
    const planLabel = 'test-plan';

    const provisionButton = new ManifoldDataProvisionButton();
    provisionButton.fetchProductPlanId = jest.fn();
    provisionButton.fetchProfileId = jest.fn();
    provisionButton.productLabel = productLabel;
    provisionButton.planLabel = planLabel;
    provisionButton.componentWillLoad();
    expect(provisionButton.fetchProductPlanId).toHaveBeenCalledWith(productLabel, planLabel);
    expect(provisionButton.fetchProfileId).toHaveBeenCalled();
  });

  it('does not fetch the profile id if set on load', () => {
    const provisionButton = new ManifoldDataProvisionButton();
    provisionButton.fetchProfileId = jest.fn();
    provisionButton.ownerId = '1234';
    provisionButton.componentWillLoad();

    expect(provisionButton.fetchProfileId).not.toHaveBeenCalled();
  });

  it('fetches product and plan id on change', () => {
    const newProduct = 'new-product';
    const newPlan = 'new-plan';

    const provisionButton = new ManifoldDataProvisionButton();
    provisionButton.fetchProductPlanId = jest.fn();
    provisionButton.productLabel = 'old-product';
    provisionButton.planLabel = 'old-plan';

    provisionButton.productChange(newProduct);
    expect(provisionButton.fetchProductPlanId).toHaveBeenCalledWith(newProduct, 'old-plan');

    provisionButton.planChange(newPlan);
    expect(provisionButton.fetchProductPlanId).toHaveBeenCalledWith('old-product', newPlan);
  });

  describe('when created with product and plans labels', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('will fetch the products and find the plan', async () => {
      const productLabel = 'test-product';
      const planLabel = 'test-plan';

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}&label=${planLabel}`, [
          ExpandedPlan,
        ]);

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="${productLabel}"
            plan-label="${planLabel}"
          >Provision</manifold-data-provision-button>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );
      expect(
        fetchMock.called(
          `${connections.prod.catalog}/plans/?product_id=${Product.id}&label=${planLabel}`
        )
      ).toBe(true);

      const root = page.rootInstance as ManifoldDataProvisionButton;
      expect(root.productId).toEqual(Product.id);
      expect(root.planId).toEqual(ExpandedPlan.id);
    });

    it('will fetch the products and find the plan even without a plan label', async () => {
      const productLabel = 'test-product';

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, [
          ExpandedPlan,
          ZiggeoPlan,
        ]);

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="${productLabel}"
          >Provision</manifold-data-provision-button>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );
      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldDataProvisionButton;
      expect(root.productId).toEqual(Product.id);
      expect(root.planId).toEqual(ExpandedPlan.id);
    });

    it('will do nothing if no product label is given', async () => {
      fetchMock.mock(`${connections.prod.catalog}/products/`, [Product]);

      await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button>Provision</manifold-data-provision-button>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/`)).toBe(false);
    });

    it('will do nothing if the products return an invalid value', async () => {
      const productLabel = 'test-product';

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, {})
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, {});

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="${productLabel}"
          >Provision</manifold-data-provision-button>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldDataProvisionButton;
      expect(root.productId).toEqual('');
    });

    it('will do nothing if the products return an invalid value', async () => {
      const productLabel = 'test-product';

      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=${productLabel}`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}`, {});

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="${productLabel}"
          >Provision</manifold-data-provision-button>
        `,
      });

      expect(fetchMock.called(`${connections.prod.catalog}/products/?label=${productLabel}`)).toBe(
        true
      );
      expect(fetchMock.called(`${connections.prod.catalog}/plans/?product_id=${Product.id}`)).toBe(
        true
      );

      const root = page.rootInstance as ManifoldDataProvisionButton;
      expect(root.productId).toEqual('');
      expect(root.planId).toEqual('');
    });
  });

  describe('when created with no owner ID', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    const profile = { id: '1234' };

    beforeEach(() => {
      fetchMock
        .mock(`${connections.prod.catalog}/products/?label=test`, [Product])
        .mock(`${connections.prod.catalog}/plans/?product_id=${Product.id}&label=test`, [
          ExpandedPlan,
        ]);
    });

    it('will fetch the owner id on load', async () => {
      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="test"
            plan-label="test"
          >Provision</manifold-data-provision-button>
        `,
      });

      const root = page.rootInstance as ManifoldDataProvisionButton;
      // TODO: Find a smarter way to call this. This is always undefined, even if the component is wrapper in the manifold-connection
      // @ts-ignore
      root.graphqlFetch = jest.fn(() => ({ data: profile }));

      root.componentWillLoad();
      await page.waitForChanges();

      expect(root.graphqlFetch).toHaveBeenCalled();
      expect(root.ownerId).toEqual(profile.id);
    });

    it('will do nothing if the owner id is set', async () => {
      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="test"
            plan-label="test"
            owner-id="5678"
          >Provision</manifold-data-provision-button>
        `,
      });

      const root = page.rootInstance as ManifoldDataProvisionButton;
      // TODO: Find a smarter way to call this. This is always undefined, even if the component is wrapper in the manifold-connection
      // @ts-ignore
      root.graphqlFetch = jest.fn(() => ({ data: profile }));

      root.componentWillLoad();
      await page.waitForChanges();

      expect(root.graphqlFetch).not.toHaveBeenCalled();
      expect(root.ownerId).toEqual('5678');
    });
  });

  describe('When sending a request to provision', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    beforeEach(() => {
      fetchMock.mock(/.*\/products\/.*/, [Product]).mock(/.*\/plans\/.*/, [ExpandedPlan]);
    });

    it('will trigger a dom event on successful provision', async () => {
      fetchMock.mock(`${connections.prod.gateway}/resource/`, GatewayResource);

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="test"
            owner-id="1234"
            resource-label="test"
          >Provision</manifold-data-provision-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataProvisionButton;
      instance.successEvent.emit = jest.fn();

      await instance.provision();

      expect(fetchMock.called(`${connections.prod.gateway}/resource/`)).toBe(true);
      expect(instance.successEvent.emit).toHaveBeenCalledWith({
        createdAt: GatewayResource.created_at,
        message: 'test successfully provisioned',
        resourceId: GatewayResource.id,
        resourceLabel: GatewayResource.label,
      });
    });

    it('will trigger a dom event on failed provision', async () => {
      fetchMock.mock(`${connections.prod.gateway}/resource/`, {
        status: 500,
        body: {
          message: 'ohnoes',
        },
      });

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="test"
            owner-id="1234"
            resource-label="test"
          >Provision</manifold-data-provision-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataProvisionButton;
      instance.errorEvent.emit = jest.fn();

      await instance.provision();

      expect(fetchMock.called(`${connections.prod.gateway}/resource/`)).toBe(true);
      expect(instance.errorEvent.emit).toHaveBeenCalledWith({
        message: 'ohnoes',
        resourceLabel: 'test',
      });
    });

    it('will trigger a dom event on an invalid resource name', async () => {
      fetchMock.mock(`${connections.prod.gateway}/resource/`, 500);

      const page = await newSpecPage({
        components: [ManifoldDataProvisionButton],
        html: `
          <manifold-data-provision-button
            product-label="test"
            owner-id="1234"
            resource-label="t"
          >Provision</manifold-data-provision-button>
        `,
      });

      const instance = page.rootInstance as ManifoldDataProvisionButton;
      instance.invalidEvent.emit = jest.fn();

      await instance.provision();

      expect(fetchMock.called(`${connections.prod.gateway}/resource/`)).toBe(false);
      expect(instance.invalidEvent.emit).toHaveBeenCalledWith({
        message: 'Must be at least 3 characters.',
        resourceLabel: 't',
      });

      instance.resourceLabel = 'Test';
      await instance.provision();

      expect(fetchMock.called(`${connections.prod.gateway}/resource/`)).toBe(false);
      expect(instance.invalidEvent.emit).toHaveBeenCalledWith({
        message:
          'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.',
        resourceLabel: 'Test',
      });
    });
  });
});
