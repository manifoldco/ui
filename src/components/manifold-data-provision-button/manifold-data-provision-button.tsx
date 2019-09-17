import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Gateway } from '../../types/gateway';
import connection from '../../state/connection';
import { globalRegion } from '../../data/region';
import { Catalog } from '../../types/catalog';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';

interface ClickMessage {
  planId: string;
  productLabel: string;
  resourceLabel: string;
}

interface SuccessMessage {
  createdAt: string;
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

const query = gql`
  query ProfileId {
    profile {
      id
    }
  }
`;

@Component({ tag: 'manifold-data-provision-button' })
export class ManifoldDataProvisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ */
  @Prop() restFetch?: RestFetch = connection.restFetch;
  /** _(hidden)_ */
  @Prop() graphqlFetch?: GraphqlFetch = connection.graphqlFetch;
  /** Product to provision (slug) */
  @Prop() productLabel?: string;
  /** Plan to provision (slug) */
  @Prop() planLabel?: string;
  /** The label of the resource to provision */
  @Prop() resourceLabel?: string;
  @Prop({ mutable: true }) ownerId?: string = '';
  /** Region to provision (ID) */
  @Prop() regionId?: string = globalRegion.id;
  @State() planId?: string = '';
  @State() productId?: string = '';
  @State() provisioning: boolean = false;
  @Event({ eventName: 'manifold-provisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true }) success: EventEmitter;

  @Watch('productLabel') productChange(newProduct: string) {
    this.fetchProductPlanId(newProduct, this.planLabel);
  }
  @Watch('planLabel') planChange(newPlan: string) {
    if (this.productLabel) {
      this.fetchProductPlanId(this.productLabel, newPlan);
    }
  }

  @loadMark()
  componentWillLoad() {
    if (this.productLabel) {
      this.fetchProductPlanId(this.productLabel, this.planLabel);
    }
    if (!this.ownerId) {
      this.fetchProfileId();
    }
  }

  async provision() {
    if (!this.restFetch) {
      return;
    }

    if (!this.ownerId) {
      console.error('Property “ownerId” is missing');
      return;
    }

    const detail = {
      planId: this.planId as string,
      productLabel: this.productLabel as string,
      resourceLabel: this.resourceLabel as string,
    };

    const clickMessage: ClickMessage = { ...detail };
    this.click.emit(clickMessage);

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

    // We use Gateway b/c it’s much easier to provision w/o generating a base32 ID
    const req: Gateway.ResourceCreateRequest = {
      label: this.resourceLabel,
      owner: {
        id: this.ownerId,
        type: 'user',
      },
      plan_id: this.planId,
      product_id: this.productId,
      region_id: this.regionId,
      source: 'catalog',
      features: {},
    };

    try {
      this.provisioning = true;
      const response = await this.restFetch<Gateway.Resource>({
        service: 'gateway',
        endpoint: `/resource/`,
        body: req,
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      });

      if (response) {
        const label = response.label || (this.resourceLabel as string);
        const success: SuccessMessage = {
          ...detail,
          createdAt: response.created_at,
          message: label ? `${label} successfully provisioned` : 'successfully provisioned',
          resourceId: response.id || '',
          resourceLabel: label,
        };
        this.success.emit(success);
        this.provisioning = false;
      }
    } catch (error) {
      this.provisioning = false;
      const e: ErrorMessage = { ...detail, message: error.message };
      this.error.emit(e);
      throw e;
    }
  }

  async fetchProductPlanId(productLabel: string, planLabel?: string) {
    // TODO: Add region fetching too
    if (!productLabel || !this.restFetch) {
      return;
    }

    const products = await this.restFetch<Catalog.Product[]>({
      service: 'catalog',
      endpoint: `/products/?label=${productLabel}`,
    });

    if (!products || !products.length) {
      console.error(`${productLabel} product not found`);
      return;
    }

    const plans = await this.restFetch<Catalog.Plan[]>({
      service: 'catalog',
      endpoint: `/plans/?product_id=${products[0].id}${planLabel ? `&label=${planLabel}` : ''}`,
    });

    if (!plans || !plans.length) {
      console.error(`${productLabel} plans not found`);
      return;
    }

    this.productId = products[0].id;
    this.planId = plans[0].id;
  }

  async fetchProfileId() {
    if (!this.graphqlFetch || this.ownerId) {
      return;
    }

    const { data } = await this.graphqlFetch({ query });

    if (data) {
      this.ownerId = data.profile.id;
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
        disabled={!this.planId || !this.productId || this.provisioning}
      >
        <slot />
      </button>
    );
  }
}
