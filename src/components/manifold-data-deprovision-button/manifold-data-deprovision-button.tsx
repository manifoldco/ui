import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Marketplace } from '../../types/marketplace';

/* eslint-disable no-console */

interface SuccessMessage {
  message: string;
  resourceName: string;
  resourceId: string;
}

interface ErrorMessage {
  message: string;
  resourceName: string;
  resourceId: string;
}

@Component({ tag: 'manifold-data-deprovision-button' })
export class ManifoldDataDeprovisionButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** The label of the resource to deprovision */
  @Prop() resourceName?: string;
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-deprovisionButton-click', bubbles: true })
  clickEvent: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-error', bubbles: true }) errorEvent: EventEmitter;
  @Event({ eventName: 'manifold-provisionButton-success', bubbles: true })
  successEvent: EventEmitter;

  @Watch('resourceName') nameChange(newName: string) {
    if (!this.resourceId) {
      this.fetchResourceId(newName);
    }
  }

  componentWillLoad() {
    if (this.resourceName && !this.resourceId) {
      this.fetchResourceId(this.resourceName);
    }
  }

  async deprovision() {
    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    // We use Gateway b/c it’s much easier to provision w/o generating a base32 ID
    this.clickEvent.emit({
      resourceId: this.resourceId,
      resourceName: this.resourceName || '',
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
        message: `${this.resourceName} successfully deprovisioned`,
        resourceName: this.resourceName || '',
        resourceId: this.resourceId,
      };
      this.successEvent.emit(success);
    } else {
      const body = await response.json();

      // Sometimes messages are an array, sometimes they aren’t. Different strokes!
      const message = Array.isArray(body) ? body[0].message : body.message;
      const error: ErrorMessage = {
        message,
        resourceName: this.resourceName || '',
        resourceId: this.resourceId,
      };
      this.errorEvent.emit(error);
    }
  }

  async fetchResourceId(resourceName: string) {
    const resourceResp = await fetch(
      `${this.connection.marketplace}/resources/?me&label=${resourceName}`,
      withAuth(this.authToken)
    );
    const resources: Marketplace.Resource[] = await resourceResp.json();

    if (!Array.isArray(resources) || !resources.length) {
      console.error(`${resourceName} product not found`);
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
