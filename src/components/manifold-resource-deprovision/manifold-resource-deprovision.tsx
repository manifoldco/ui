import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';

@Component({ tag: 'manifold-resource-deprovision' })
export class ManifoldResourceDeprovision {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  @Event({ eventName: 'manifold-deprovisionButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-deprovisionButton-success', bubbles: true }) success: EventEmitter;

  render() {
    return (
      <manifold-data-deprovision-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        onManifold-deprovisionButton-click={this.click.emit}
        onManifold-deprovisionButton-error={this.error.emit}
        onManifold-deprovisionButton-success={this.success.emit}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-deprovision-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceDeprovision, ['data', 'loading']);
