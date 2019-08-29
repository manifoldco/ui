import { h, Component, Prop, Element, Watch, Event, EventEmitter } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface ClickMessage {
  resourceLabel: string;
  resourceId?: string;
}

interface SuccessMessage {
  message: string;
  resourceLabel: string;
  resourceId?: string;
  credentials?: { [s: string]: string };
}

interface ErrorMessage {
  message: string;
  resourceLabel: string;
  resourceId?: string;
}

@Component({ tag: 'manifold-data-get-credentials-button' })
export class ManifoldDataGetCredentialsButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** The label of the resource to fetch credentials for */
  @Prop() resourceLabel?: string;
  /** The id of the resource to fetch credentials for */
  @Prop({ mutable: true }) resourceId?: string = '';
  /** Sets if the credentials should be copied to clipboard in addition to being sent in a dom event. */
  @Prop() copyToClipboard: boolean = false;
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-getCredentialsButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-getCredentialsButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-getCredentialsButton-success', bubbles: true })
  success: EventEmitter;

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

  async getCreds() {
    if (!this.restFetch || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

    const clickEvent: ClickMessage = {
      resourceId: this.resourceId,
      resourceLabel: this.resourceLabel || '',
    };
    this.click.emit(clickEvent);

    try {
      const response = await this.restFetch<Marketplace.Credential[]>({
        service: 'marketplace',
        endpoint: `/credentials/?resource_id=${this.resourceId}`,
      });

      let credentials: { [s: string]: string } = {};
      if (response) {
        response.forEach(cred => {
          credentials = {
            ...credentials,
            ...cred.body.values,
          };
        });
      }

      const success: SuccessMessage = {
        message: `successfully obtained the credentials for ${this.resourceLabel}`,
        credentials,
        resourceLabel: this.resourceLabel || '',
        resourceId: this.resourceId,
      };
      this.success.emit(success);

      if (this.copyToClipboard) {
        this.sendToClipboard(credentials);
      }
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

  sendToClipboard(credentials: { [s: string]: string }): void {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = Object.entries(credentials)
      .reduce((accumulator: string, cred) => `${accumulator}\n${cred[0]}: ${cred[1]}`, '')
      .trimLeft();

    this.el.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    this.el.removeChild(textArea);
  }

  @logger()
  render() {
    return (
      <button
        onClick={() => this.getCreds()}
        data-resource-id={this.resourceId}
        disabled={!this.resourceId && !this.loading}
      >
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataGetCredentialsButton, ['restFetch']);
