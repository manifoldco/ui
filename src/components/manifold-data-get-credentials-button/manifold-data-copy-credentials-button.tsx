import { h, Component, Prop, State, Element, Watch } from '@stencil/core';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-data-copy-credentials-button' })
export class ManifoldDataCopyCredentialsButton {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** The label of the resource to fetch credentials for */
  @Prop() resourceLabel?: string;
  /** The id of the resource to fetch credentials for */
  @Prop({ mutable: true }) resourceId?: string = '';
  @Prop() loading?: boolean = false;
  @State() credentials?: { [s: string]: string };

  @Watch('resourceLabel') labelChange(newLabel: string) {
    this.fetchResourceId(newLabel).then(() => {
      this.getCreds();
    });
  }

  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel).then(() => {
        this.getCreds();
      });
      return;
    }
    this.getCreds();
  }

  async getCreds() {
    if (!this.restFetch || this.loading) {
      return;
    }

    if (!this.resourceId) {
      console.error('Property “resourceId” is missing');
      return;
    }

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

    this.credentials = credentials;
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

  sendToClipboard = (): void => {
    if (!this.credentials) {
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.innerHTML = Object.entries(this.credentials)
      .reduce((accumulator: string, cred) => `${accumulator}\n${cred[0]}: ${cred[1]}`, '')
      .trimLeft();

    this.el.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    this.el.removeChild(textArea);
  };

  @logger()
  render() {
    return (
      <button
        onClick={this.sendToClipboard}
        data-resource-id={this.resourceId}
        disabled={!this.resourceId || this.loading || !this.credentials}
      >
        <slot />
      </button>
    );
  }
}

Tunnel.injectProps(ManifoldDataCopyCredentialsButton, ['restFetch']);
