import { h, Component, Prop, State, Watch } from '@stencil/core';

import ConnectionTunnel from '../../data/connection';
import ResourceTunnel from '../../data/resource';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** Which resource does this belong to? */
  @Prop() resourceLabel: string;
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = false;
  @Watch('resourceName') resourceChange(newName: string) {
    this.fetchResource(newName);
  }

  componentWillLoad() {
    this.fetchResource(this.resourceLabel);
  }

  fetchResource = async (resourceName: string) => {
    this.loading = true;
    const { gateway } = this.connection;
    const response = await fetch(`${gateway}/resources/me/${resourceName}`, withAuth());
    const resource: Gateway.Resource = await response.json();
    this.resource = resource;
    this.loading = false;
  };

  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}

ConnectionTunnel.injectProps(ManifoldResourceContainer, ['connection']);
