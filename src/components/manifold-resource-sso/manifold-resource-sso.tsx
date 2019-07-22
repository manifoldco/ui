import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-sso' })
export class ManifoldResourceSso {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  @Event({ eventName: 'manifold-ssoButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-ssoButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-ssoButton-success', bubbles: true }) success: EventEmitter;

  render() {
    return (
      <manifold-data-sso-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        onManifold-ssoButton-click={this.click.emit}
        onManifold-ssoButton-error={this.error.emit}
        onManifold-ssoButton-success={this.success.emit}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-sso-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceSso, ['data', 'loading']);
