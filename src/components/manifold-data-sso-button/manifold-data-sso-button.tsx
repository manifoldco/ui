import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Marketplace } from '../../types/marketplace';
import { Connector } from '../../types/connector';
import logger from '../../utils/logger';

/* eslint-disable no-console */

interface ClickMessage {
  resourceLabel: string;
  resourceId: string;
}

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
  redirectUrl: string;
}

interface ErrorMessage {
  message: string;
  resourceLabel: string;
  resourceId: string;
}

@Component({ tag: 'manifold-data-sso-button' })
export class ManifoldDataSsoButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** The label of the resource to rename */
  @Prop() resourceLabel?: string;
  /** The id of the resource to rename, will be fetched if not set */
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-ssoButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-ssoButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-ssoButton-success', bubbles: true }) success: EventEmitter;

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

  async sso() {
    if (!this.connection || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    const clickMessage: ClickMessage = {
      resourceLabel: this.resourceLabel || '',
      resourceId: this.resourceId,
    };
    this.click.emit(clickMessage);

    const body: Connector.AuthCodeRequest = {
      body: {
        resource_id: this.resourceId,
      },
    };
    const response = await fetch(
      `${this.connection.connector}/sso`,
      withAuth(this.authToken, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    );

    // If successful, this will return 200 and stop here
    if (response.status >= 200 && response.status < 300) {
      const result: Connector.AuthorizationCode = await response.json();

      const success: SuccessMessage = {
        message: `${this.resourceLabel} successfully ssoed`,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
        redirectUrl: result.body.redirect_uri,
      };
      this.success.emit(success);
    } else {
      const result = await response.json();

      // Sometimes messages are an array, sometimes they aren’t. Different strokes!
      const message = Array.isArray(result) ? result[0].message : result.message;
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

  validate(input: string) {
    return /^[a-z][a-z0-9]*/.test(input);
  }

  @logger()
  render() {
    return (
      <button type="submit" onClick={() => this.sso()} disabled={!this.resourceId && !this.loading}>
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataSsoButton, ['connection', 'authToken']);
