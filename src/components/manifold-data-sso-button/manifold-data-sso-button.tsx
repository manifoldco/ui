import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { Connector } from '../../types/connector';
import { RestFetch } from '../../utils/restFetch';
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
  @Prop() restFetch?: RestFetch;
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
    if (!this.restFetch || this.loading) {
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

    const response = await this.restFetch<Connector.AuthorizationCode>({
      service: 'connector',
      endpoint: `/sso`,
      body,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
    });

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
      message: `${this.resourceLabel} successfully ssoed`,
      resourceLabel: this.resourceLabel || '',
      resourceId: this.resourceId,
      redirectUrl: response.body.redirect_uri,
    };
    this.success.emit(success);
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
      console.error(`${resourceLabel} resource not found`);
      return;
    }

    this.resourceId = resources[0].id;
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

Tunnel.injectProps(ManifoldDataSsoButton, ['restFetch']);
