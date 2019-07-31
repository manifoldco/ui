import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { refresh_cw } from '@manifoldco/icons';

import Tunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

interface EventDetail {
  resourceId?: string;
  resourceLabel?: string;
  resourceName?: string;
}

const AVAILABLE = 'available';
const PROVISIONING = 'provision';
const DEGRADED = 'degraded';
const OFFLINE = 'offline';

@Component({
  tag: 'manifold-resource-card-view',
  styleUrl: 'manifold-resource-card-view.css',
  shadow: true,
})
export class ManifoldResourceCardView {
  @Element() el: HTMLElement;
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;

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

  get status(): string {
    if (
      this.resourceStatus &&
      (this.resourceStatus === AVAILABLE ||
        this.resourceStatus === PROVISIONING ||
        this.resourceStatus === DEGRADED)
    ) {
      return this.resourceStatus;
    }
    return OFFLINE;
  }

  async fetchResourceId(resourceName: string) {
    if (!this.connection) {
      return;
    }
    const { gateway } = this.connection;
    const response = await fetch(
      `${gateway}/resources/me/${resourceName}`,
      withAuth(this.authToken)
    );

    const resource: Gateway.Resource = await response.json();
    if (resource.id) {
      this.resourceId = resource.id;
    }
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
              {this.status[0].toUpperCase() + this.status.slice(1)}
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

Tunnel.injectProps(ManifoldResourceCardView, ['connection', 'authToken']);
