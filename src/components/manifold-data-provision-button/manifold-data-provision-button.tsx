import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { Catalog } from '../../types/catalog';
import { GraphqlFetch } from '../../utils/graphqlFetch';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface SuccessMessage {
  createdAt: string;
  resourceLabel: string;
  resourceId: string;
  message: string;
}

interface ErrorMessage {
  message: string;
  resourceLabel?: string;
}

interface Profile {
  id: string;
}

interface ProfileMessage {
  profile: Profile;
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
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: GraphqlFetch;
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

    if (this.resourceLabel && this.resourceLabel.length < 3) {
      this.invalid.emit({
        message: 'Must be at least 3 characters.',
        resourceLabel: this.resourceLabel,
      });
      return;
    }
    if (this.resourceLabel && !this.validate(this.resourceLabel)) {
      this.invalid.emit({
        message:
          'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.',
        resourceLabel: this.resourceLabel,
      });
      return;
    }

    // We use Gateway b/c it’s much easier to provision w/o generating a base32 ID
    this.click.emit({
      resourceLabel: this.resourceLabel,
    });

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
        const success: SuccessMessage = {
          createdAt: response.created_at,
          message: `${this.resourceLabel} successfully provisioned`,
          resourceId: response.id || '',
          resourceLabel: response.label,
        };
        this.success.emit(success);
      }
    } catch (error) {
      const e: ErrorMessage = {
        message: error.message,
        resourceLabel: this.resourceLabel,
      };
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

    const { data } = await this.graphqlFetch<ProfileMessage>({ query });

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
        disabled={!this.planId || !this.productId}
      >
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataProvisionButton, ['restFetch', 'graphqlFetch']);
