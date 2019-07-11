import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';

@Component({ tag: 'manifold-resource-rename' })
export class ManifoldResourceRename {
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => (
          <manifold-data-rename-button
            resourceId={state.data && state.data.id}
            resourceName={state.data && state.data.label}
            loading={state.loading}
          >
            <manifold-forward-slot>
              <slot />
            </manifold-forward-slot>
          </manifold-data-rename-button>
        )}
      </ResourceTunnel.Consumer>
    );
  }
}
