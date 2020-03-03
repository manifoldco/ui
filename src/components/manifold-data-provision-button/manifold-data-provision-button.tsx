import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';

import { GraphqlFetch } from '../../utils/graphqlFetch';
import { connection } from '../../global/app';
import logger, { loadMark } from '../../utils/logger';

import {
  CreateResourceMutation,
  PlanRegionsQuery,
  PlanRegionsQueryVariables,
  ProductIdQuery,
  ProductIdQueryVariables,
  ConfiguredFeatureInput,
  CreateResourceMutationVariables,
  CreateResourceWithOwnerMutationVariables,
} from '../../types/graphql';

import createResource from './create.graphql';
import createResourceWithOwner from './create-with-owner.graphql';
import planRegionsQuery from './plan-regions.graphql';
import productIdQuery from './product-id.graphql';

interface ClickMessage {
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

interface SuccessMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceId: string;
  resourceLabel: string;
}

interface InvalidMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

interface ErrorMessage {
  message: string;
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

@Component({ tag: 'manifold-data-provision-button' })
export class ManifoldDataProvisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Product ID */
  @Prop({ mutable: true }) productId?: string = '';
  /** Owner ID */
  @Prop() ownerId?: string;
  /** Product to provision (slug) */
  @Prop() productLabel?: string;
  /** Plan to provision (slug) */
  @Prop() planId?: string;
  /** The label of the resource to provision */
  @Prop() resourceLabel?: string;
  /** Values for configurable features */
  @Prop() configuredFeatures?: ConfiguredFeatureInput[];
  /** Region to provision (ID) */
  @Prop({ mutable: true }) regionId?: string;
  @State() provisioning: boolean = false;
  @Event({ eventName: 'manifold-provisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true }) success: EventEmitter;

  @Watch('planId') planChange(newPlan: string) {
    if (newPlan) {
      this.updateRegions(newPlan);
    }
  }
  @Watch('productLabel') productChange(newProduct: string) {
    if (newProduct) {
      this.fetchProductId(newProduct);
    }
  }

  @loadMark()
  componentWillLoad() {
    // fetch product ID
    if (this.productLabel && !this.productId) {
      this.fetchProductId(this.productLabel);
    }
    // if resource missing, fetch (will only save if there’s only 1 region)
    if (this.planId && !this.regionId) {
      this.updateRegions(this.planId);
    }
  }

  async provision() {
    if (!this.graphqlFetch) {
      return;
    }

    const detail = {
      planId: this.planId as string,
      productLabel: this.productLabel as string,
      resourceLabel: this.resourceLabel as string,
    };

    // click event
    const clickMessage: ClickMessage = { ...detail };
    this.click.emit(clickMessage);

    // invalid event
    if (this.resourceLabel) {
      if (this.resourceLabel.length < 3) {
        const message: InvalidMessage = { ...detail, message: 'Must be at least 3 characters' };
        this.invalid.emit(message);
        return;
      }
      if (!this.validate(this.resourceLabel)) {
        const message: InvalidMessage = {
          ...detail,
          message:
            'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens',
        };
        this.invalid.emit(message);
        return;
      }
    }

    // disable button & attempt provision
    this.provisioning = true;

    const variables: CreateResourceMutationVariables | CreateResourceWithOwnerMutationVariables = {
      planId: this.planId || '',
      productId: this.productId || '',
      regionId: this.regionId || '',
      resourceLabel: this.resourceLabel || '',
      configuredFeatures: this.configuredFeatures,
      owner: this.ownerId,
    };

    const { data, errors } = await this.graphqlFetch<CreateResourceMutation>({
      query: this.ownerId ? createResourceWithOwner : createResource,
      variables,
      element: this.el,
    });
    this.provisioning = false;

    // success event
    if (data && data.createResource) {
      const success: SuccessMessage = {
        ...detail,
        message: `${data.createResource.data.label} successfully provisioned`,
        resourceId: data.createResource.data.id,
        resourceLabel: data.createResource.data.label,
      };
      this.success.emit(success);
    }

    // error event
    if (errors) {
      errors.forEach(({ message }) => {
        const e: ErrorMessage = { ...detail, message };
        this.error.emit(e);
      });
    }
  }

  async fetchProductId(productLabel: string) {
    if (!productLabel || !this.graphqlFetch) {
      return;
    }
    const variables: ProductIdQueryVariables = { productLabel };
    const { data } = await this.graphqlFetch<ProductIdQuery>({
      query: productIdQuery,
      variables,
      element: this.el,
    });

    if (data && data.product) {
      this.productId = data.product.id;
    }
  }

  async updateRegions(planId: string) {
    if (!this.graphqlFetch) {
      return;
    }
    const variables: PlanRegionsQueryVariables = { planId };
    const { data } = await this.graphqlFetch<PlanRegionsQuery>({
      query: planRegionsQuery,
      variables,
      element: this.el,
    });

    if (data && data.plan && data.plan.regions) {
      // if a plan only has one region, use that
      if (data.plan.regions.edges.length === 1) {
        this.regionId = data.plan.regions.edges[0].node.id;
      }
    }
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  @logger()
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.provision()}
        disabled={!this.planId || !this.productId || !this.regionId || this.provisioning}
      >
        <slot />
      </button>
    );
  }
}
