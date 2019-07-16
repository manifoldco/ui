import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
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
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
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
    if (!this.connection || this.loading) {
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

    const response = await fetch(
      `${this.connection.gateway}/id/resource/${this.resourceId}`,
      withAuth(this.authToken, {
        method: 'DELETE',
      })
    );

    // If successful, this will return 200 and stop here
    if (response.status >= 200 && response.status < 300) {
      const success: SuccessMessage = {
        message: `${this.resourceLabel} successfully deprovisioned`,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };
      this.success.emit(success);
    } else {
      const body = await response.json();

      // Sometimes messages are an array, sometimes they aren’t. Different strokes!
      const message = Array.isArray(body) ? body[0].message : body.message;
      const error: ErrorMessage = {
        message,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };
      this.error.emit(error);
    }
  }

  async fetchResourceId(resourceLabel: string) {
    if (!this.connection) {
      return;
    }

    const resourceResp = await fetch(
      `${this.connection.marketplace}/resources/?me&label=${resourceLabel}`,
      withAuth(this.authToken)
    );
    const resources: Marketplace.Resource[] = await resourceResp.json();

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

Tunnel.injectProps(ManifoldDataDeprovisionButton, ['connection', 'authToken']);
