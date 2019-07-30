import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Connection } from '../../utils/connections';
import { Marketplace } from '../../types/marketplace';

/* eslint-disable no-console */

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
}

@Component({ tag: 'manifold-data-deprovision-button' })
export class ManifoldDataDeprovisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
  /** The label of the resource to deprovision */
  @Prop() resourceLabel?: string;
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-deprovisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-success', bubbles: true }) success: EventEmitter;

  @Watch('resourceLabel') labelChange(newLabel: string) {
    if (!this.resourceId) {
      this.fetchResourceId(newLabel);
    }
  }

  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  async deprovision() {
    if (!this.restFetch || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    // We use Gateway b/c it’s much easier to provision w/o generating a base32 ID
    this.click.emit({
      resourceId: this.resourceId,
      resourceLabel: this.resourceLabel || '',
    });

    const response = await this.restFetch(
      'gateway',
      `/id/resource/${this.resourceId}`,
      {},
      { method: 'DELETE' }
    );

    if (response instanceof Error) {
      const error: ErrorMessage = {
        message: response.message,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };
      this.error.emit(error);
      return;
    }

    const success: SuccessMessage = {
      message: `${this.resourceLabel} successfully deprovisioned`,
      resourceLabel: this.resourceLabel || '',
      resourceId: this.resourceId,
    };
    this.success.emit(success);
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>(
      'marketplace',
      `/resources/?me&label=${resourceLabel}`
    );

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

  render() {
    return (
      <button
        type="submit"
        onClick={() => this.deprovision()}
        disabled={!this.resourceId && !this.loading}
      >
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataDeprovisionButton, ['restFetch']);
