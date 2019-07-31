import { h, Component } from '@stencil/core';

import ResourceTunnel, { ResourceState } from '../../data/resource';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  @logger()
  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => (
          <manifold-credentials
            resourceLabel={state.data && state.data.label}
            resourceId={state.data && state.data.id}
          />
        )}
      </ResourceTunnel.Consumer>
    );
  }
}
