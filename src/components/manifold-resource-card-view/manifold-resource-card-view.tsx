import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';

import Tunnel from '../../data/connection';
import { Marketplace } from '../../types/marketplace';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

interface EventDetail {
  resourceId?: string;
  resourceLabel?: string;
  resourceName?: string;
}

const AVAILABLE = 'available';
const PROVISIONING = 'provision';
const RESIZING = 'resize';
const DEPROVISION = 'deprovision';
const OFFLINE = 'offline';

const statusToText = {
  [AVAILABLE]: 'Available',
  [PROVISIONING]: 'Provisioning',
  [RESIZING]: 'Resizing',
  [DEPROVISION]: 'Deprovisioning',
  [OFFLINE]: 'Offline',
};

@Component({
  tag: 'manifold-resource-card-view',
  styleUrl: 'manifold-resource-card-view.css',
  shadow: true,
})
export class ManifoldResourceCardView {
  @Element() el: HTMLElement;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;

  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() logo?: string;
  @Prop() resourceId?: string;
  @Prop() resourceStatus?: string;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-resource-click', bubbles: true }) resourceClick: EventEmitter;

  @Watch('label') resourceChange(newLabel: string) {
    if (!this.loading && !this.resourceId) {
      this.fetchResourceId(newLabel);
    }
  }

  componentWillLoad() {
    if (!this.loading && !this.resourceId && this.label) {
      this.fetchResourceId(this.label);
    }
  }

  get href() {
    if (!this.resourceLinkFormat || !this.label) {
      return '';
    }
    return this.resourceLinkFormat.replace(/:resource/gi, this.label);
  }

  get status() {
    if (
      this.resourceStatus &&
      [AVAILABLE, PROVISIONING, RESIZING, DEPROVISION].includes(this.resourceStatus)
    ) {
      return this.resourceStatus;
    }
    return OFFLINE;
  }

  get statusText() {
    switch (this.resourceStatus) {
      case AVAILABLE:
        return statusToText[AVAILABLE];
      case PROVISIONING:
        return statusToText[PROVISIONING];
      case RESIZING:
        return statusToText[RESIZING];
      case DEPROVISION:
        return statusToText[DEPROVISION];
      default:
        return statusToText[OFFLINE];
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
      console.error(`${resourceLabel} resource not found`);
      return;
    }

    this.resourceId = response[0].id;
  }

  onClick = (e: Event): void => {
    if (!this.resourceLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        resourceId: this.resourceId,
        resourceLabel: this.label,
        resourceName: this.name,
      };
      this.resourceClick.emit(detail);
    }
  };

  @logger()
  render() {
    return !this.loading && this.resourceId ? (
      <a
        class="wrapper"
        role="button"
        itemscope
        itemtype="https://schema.org/Resource"
        itemprop="url"
        href={this.href}
        onClick={this.onClick}
      >
        <h3 class="name" itemprop="name">
          {this.name || this.label}
        </h3>
        <div class="status-box">
          <div class="status" data-status={this.status}>
            <div class="inner" itemprop="status">
              {this.statusText}
            </div>
          </div>
        </div>
        <div class="logo">
          {this.logo && <manifold-lazy-image src={this.logo} alt={this.label} itemprop="image" />}
        </div>
      </a>
    ) : (
      // ☠
      <div class="wrapper">
        <h3 class="name">
          <manifold-skeleton-text>{this.label}</manifold-skeleton-text>
        </h3>
        <div class="status-box">
          <div class="loading" data-status={this.resourceStatus}>
            <manifold-icon icon={refresh_cw} />
            Loading
          </div>
        </div>
        <div class="logo">
          <manifold-skeleton-img />
        </div>
      </div>
    );
  }
}

Tunnel.injectProps(ManifoldResourceCardView, ['restFetch']);
