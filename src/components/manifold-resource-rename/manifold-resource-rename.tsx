import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';

import ResourceTunnel from '../../data/resource';
import { Gateway } from '../../types/gateway';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = true;
  /** The new label to give to the resource */
  @Prop() newLabel: string = '';
  @Event({ eventName: 'manifold-renameButton-click', bubbles: true }) click: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-invalid', bubbles: true }) invalid: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-error', bubbles: true }) error: EventEmitter;
  @Event({ eventName: 'manifold-renameButton-success', bubbles: true }) success: EventEmitter;

  @logger()
  render() {
    return (
      <manifold-data-rename-button
        resourceId={this.data && this.data.id}
        resourceLabel={this.data && this.data.label}
        loading={this.loading}
        newLabel={this.newLabel}
        onManifold-renameButton-click={this.click.emit}
        onManifold-renameButton-invalid={this.invalid.emit}
        onManifold-renameButton-error={this.error.emit}
        onManifold-renameButton-success={this.success.emit}
      >
        <manifold-forward-slot>
          <slot />
        </manifold-forward-slot>
      </manifold-data-rename-button>
    );
  }
}

ResourceTunnel.injectProps(ManifoldResourceRename, ['data', 'loading']);
