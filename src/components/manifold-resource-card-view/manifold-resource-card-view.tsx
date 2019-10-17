import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import { resource } from '@manifoldco/icons';

import logger from '../../utils/logger';
import loadMark from '../../utils/loadMark';
import { ResourceStatusLabel } from '../../types/graphql';

interface EventDetail {
  resourceId?: string;
  resourceLabel?: string;
  resourceName?: string;
}

@Component({
  tag: 'manifold-resource-card-view',
  styleUrl: 'manifold-resource-card-view.css',
  shadow: true,
})
export class ManifoldResourceCardView {
  @Element() el: HTMLElement;

  @Prop() label?: string;
  @Prop() logo?: string;
  @Prop() logoLabel?: string;
  @Prop() resourceId?: string;
  @Prop() resourceStatus?: ResourceStatusLabel;
  @Prop() resourceLinkFormat?: string;
  @Prop() preserveEvent?: boolean = false;
  @Prop() loading?: boolean = false;
  @Event({ eventName: 'manifold-resource-click', bubbles: true }) resourceClick: EventEmitter;

  @loadMark()
  componentWillLoad() {}

  get href() {
    if (!this.resourceLinkFormat || !this.label) {
      return '';
    }
    return this.resourceLinkFormat.replace(/:resource/gi, this.label);
  }

  onClick = (e: Event): void => {
    if (!this.resourceLinkFormat || this.preserveEvent) {
      e.preventDefault();
      const detail: EventDetail = {
        resourceId: this.resourceId,
        resourceLabel: this.label,
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
          {this.label}
        </h3>
        <div class="status">
          <manifold-resource-status-view size="xsmall" resourceState={this.resourceStatus} />
        </div>
        <div class="logo">
          {this.logo ? (
            <img
              src={this.logo}
              alt={this.logoLabel}
              itemprop="image"
              loading="lazy"
              height="48"
              width="48"
            />
          ) : (
            <div class="logo-placeholder">
              <manifold-icon icon={resource} />
            </div>
          )}
        </div>
      </a>
    ) : (
      // ☠
      <div class="wrapper">
        <h3 class="name">
          <manifold-skeleton-text>{this.label}</manifold-skeleton-text>
        </h3>
        <div class="status">
          <manifold-skeleton-text>Loading resource</manifold-skeleton-text>
        </div>
        <div class="logo">
          <manifold-skeleton-img />
        </div>
      </div>
    );
  }
}
