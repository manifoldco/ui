import { h, Component, Prop, State, Watch } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import ConnectionTunnel from '../../data/connection';
import ResourceTunnel from '../../data/resource';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = false;

  @Watch('resourceLabel') resourceChange(newName: string) {
    this.fetchResource(newName);
  }

  componentWillLoad() {
    if (this.resourceLabel) {
      this.fetchResource(this.resourceLabel);
    }
  }

  fetchResource = async (resourceLabel: string) => {
    this.loading = true;
    const { gateway } = this.connection;
    const response = await fetch(`${gateway}/resources/me/${resourceLabel}`, withAuth(this.authToken));
    this.resource = await response.json();
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

ConnectionTunnel.injectProps(ManifoldResourceContainer, ['connection', 'authToken']);
