import { h, Component, Prop, State, Element, Event, EventEmitter, Watch } from '@stencil/core';

import { Gateway } from '../../types/gateway';
import Tunnel from '../../data/connection';
import { globalRegion } from '../../data/region';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

/* eslint-disable no-console */

interface SuccessMessage {
  features?: Gateway.FeatureMap;
  resourceLabel: string;
  resourceId: string;
  planName?: string;
  message: string;
}

interface ErrorMessage {
  features: Gateway.FeatureMap;
  resourceLabel: string;
  resourceId: string;
  message: string;
}

@Component({ tag: 'manifold-data-manage-button' })
export class ManifoldDataManageButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** Name of resource */
  @Prop() resourceLabel?: string;
  @Prop() features?: Gateway.FeatureMap = {};
  @Prop() planId?: string = '';
  @Prop({ mutable: true }) productId?: string = '';
  @Prop() regionId?: string = globalRegion.id;
  @State() resourceId: string = '';
  @Event({ eventName: 'manifold-manageButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-manageButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-manageButton-success', bubbles: true }) success: EventEmitter;
  @Watch('resourceLabel') resourceChange(newResource: string) {
    this.fetchResourceId(newResource);
  }

  componentDidLoad() {
    if (this.resourceLabel) {
      return this.fetchResourceId(this.resourceLabel);
    }
    return null;
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }
    const resources: Marketplace.Resource[] = response;

    if (!Array.isArray(resources) || !resources.length) {
      console.error(`${resourceLabel} product not found`);
      return;
    }

    this.resourceId = resources[0].id;
  }

  async update() {
    if (!this.restFetch) {
      return;
    }

    if (typeof this.features !== 'object') {
      console.error('Property “features” is missing!');
      return;
    }

    this.click.emit({
      planId: this.planId,
      resourceLabel: this.resourceLabel,
      resourceId: this.resourceId,
    });
    const req: Gateway.ResourceUpdateRequest = { plan_id: this.planId };

    if (Object.keys(this.features).length) {
      req.features = this.features;
    }

    const response = await this.restFetch<Gateway.Resource>({
      service: 'gateway',
      endpoint: `/id/resource/${this.resourceId}`,
      body: req,
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      },
    });

    if (response instanceof Error) {
      const error: ErrorMessage = {
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
        message: response.message,
        features: this.features,
      };
      this.error.emit(error);
      return;
    }

    const planName = response.plan && response.plan.name;
    const success: SuccessMessage = {
      message: `${this.resourceLabel} successfully updated to ${planName}`,
      resourceLabel: this.resourceLabel || '',
      resourceId: this.resourceId,
      planName,
      features: response.features,
    };
    this.success.emit(success);
  }

  @logger()
  render() {
    return (
      <button type="button" onClick={() => this.update()}>
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataManageButton, ['restFetch']);
