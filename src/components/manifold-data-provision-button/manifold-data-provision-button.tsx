import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { gql } from '@manifoldco/gql-zero';

import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Catalog } from '../../types/catalog';
import { GraphqlRequestBody, GraphqlResponseBody } from '../../utils/graphqlFetch';

/* eslint-disable no-console */

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
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() graphqlFetch?: <T>(body: GraphqlRequestBody) => GraphqlResponseBody<T>;
  /** Product to provision (slug) */
  @Prop() productLabel?: string;
  /** Plan to provision (slug) */
  @Prop() planLabel?: string;
  /** Region to provision (complete name), omit for all region */
  @Prop() regionName?: string;
  /** The label of the resource to provision */
  @Prop() resourceLabel?: string;
  @Prop({ mutable: true }) ownerId?: string = '';
  @Prop() regionId?: string = globalRegion.id;
  @State() planId?: string = '';
  @State() productId?: string = '';
  @Event({ eventName: 'manifold-provisionButton-click', bubbles: true })
  clickEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-invalid', bubbles: true })
  invalidEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-error', bubbles: true }) errorEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true })
  successEvent: EventEmitter;

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
    if (!this.connection) {
      return;
    }

    if (!this.ownerId) {
      console.error('Property “ownerId” is missing');
      return;
    }

    if (this.resourceLabel && this.resourceLabel.length < 3) {
      this.invalidEvent.emit({
        message: 'Must be at least 3 characters.',
        resourceLabel: this.resourceLabel,
      });
      return;
    }
    if (this.resourceLabel && !this.validate(this.resourceLabel)) {
      this.invalidEvent.emit({
        message:
          'Must start with a lowercase letter, and use only lowercase, numbers, and hyphens.',
        resourceLabel: this.resourceLabel,
      });
      return;
    }

    // We use Gateway b/c it’s much easier to provision w/o generating a base32 ID
    this.clickEvent.emit({
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

    const response = await fetch(
      `${this.connection.gateway}/resource/`,
      withAuth(this.authToken, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
    );

    const body = await response.json();

    // If successful, this will return 200 and stop here
    if (response.status >= 200 && response.status < 300) {
      const success: SuccessMessage = {
        createdAt: body.created_at,
        message: `${this.resourceLabel} successfully provisioned`,
        resourceId: body.id,
        resourceLabel: body.label,
      };
      this.successEvent.emit(success);
    } else {
      // Sometimes messages are an array, sometimes they aren’t. Different strokes!
      const message = Array.isArray(body) ? body[0].message : body.message;
      const error: ErrorMessage = {
        message,
        resourceLabel: this.resourceLabel,
      };
      this.errorEvent.emit(error);
    }
  }

  async fetchProductPlanId(productLabel: string, planLabel?: string) {
    // TODO: Add region fetching too
    if (!productLabel || !this.connection) {
      return;
    }

    const productResp = await fetch(
      `${this.connection.catalog}/products/?label=${productLabel}`,
      withAuth(this.authToken)
    );
    const products: Catalog.Product[] = await productResp.json();

    if (!Array.isArray(products) || !products.length) {
      console.error(`${productLabel} product not found`);
      return;
    }

    const planResp = await fetch(
      `${this.connection.catalog}/plans/?product_id=${products[0].id}${
        planLabel ? `&label=${planLabel}` : ''
      }`,
      withAuth(this.authToken)
    );
    const plans: Catalog.Plan[] = await planResp.json();

    if (!Array.isArray(plans) || !plans.length) {
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
    console.log(data);

    if (data) {
      this.ownerId = data.profile.id;
    }
  }

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

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

Tunnel.injectProps(ManifoldDataProvisionButton, ['connection', 'authToken', 'graphqlFetch']);
