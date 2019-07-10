import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';

@Component({ tag: 'manifold-resource-deprovision' })
export class ManifoldResourceDeprovision {
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => state.loading && state.data ? (
          <manifold-data-deprovision-button resourceId={state.data.id} resourceName={state.data.label}>
            <manifold-forward-slot>
              <slot />
            </manifold-forward-slot>
          </manifold-data-deprovision-button>
        ) : (
          <manifold-data-deprovision-button loading={true}>
            <manifold-forward-slot>
              <slot />
            </manifold-forward-slot>
          </manifold-data-deprovision-button>
        )}
      </ResourceTunnel.Consumer>
    );
  }
}
