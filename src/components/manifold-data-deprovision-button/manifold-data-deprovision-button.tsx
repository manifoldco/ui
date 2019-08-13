import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  resourceLabel: string;
  resourceId?: string;
}

@Component({ tag: 'manifold-data-deprovision-button' })
export class ManifoldDataDeprovisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
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

    try {
      await this.restFetch({
        service: 'gateway',
        endpoint: `/id/resource/${this.resourceId}`,
        options: { method: 'DELETE' },
      });
      const success: SuccessMessage = {
        message: `${this.resourceLabel} successfully deprovisioned`,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };
      this.success.emit(success);
    } catch (e) {
      const error: ErrorMessage = {
        message: e.message,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };

      this.error.emit(error);
      throw error;
    }
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const response = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (!response || !response.length) {
      console.error(`${resourceLabel} product not found`);
      return;
    }

    this.resourceId = response[0].id;
  }

  @logger()
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
