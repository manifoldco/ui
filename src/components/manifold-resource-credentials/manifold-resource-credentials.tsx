import { h, Component, Prop, State } from '@stencil/core';

import ConnectionTunnel from '../../data/connection';
import ResourceTunnel, { State as ResourceState } from '../../data/resource';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-resource-credentials' })
export class ManifoldResourceCredentials {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Which resource does this belong to? */
  @State() credentials?: Marketplace.Credential[];

  fetchCredentials = async (resource?: Gateway.Resource) => {
    if (!resource) {
      return;
    }

    const { marketplace } = this.connection;
    const response = await fetch(
      `${marketplace}/credentials/?resource_id=${resource.id}`,
      withAuth()
    );
    const credentials: Marketplace.Credential[] = await response.json();
    this.credentials = credentials;
  };

  credentialsRequested = (event: CustomEvent<Gateway.Resource | undefined>) => {
    this.fetchCredentials(event.detail);
  };

  render() {
    return (
      <ResourceTunnel.Consumer>
        {(state: ResourceState) => (
          <manifold-resource-credentials-view
            resourceState={state}
            credentials={this.credentials}
            onCredentialsRequested={this.credentialsRequested}
          />
        )}
      </ResourceTunnel.Consumer>
    );
  }
}

ConnectionTunnel.injectProps(ManifoldResourceCredentials, ['connection']);
