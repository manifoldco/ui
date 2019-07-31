import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import ConnectionTunnel from '../../data/connection';
import { withAuth } from '../../utils/auth';
import { Connection, connections } from '../../utils/connections';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-credentials' })
export class ManifoldCredentials {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() connection?: Connection = connections.prod;
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() authToken?: string;
  @Prop() resourceLabel: string = '';
  @Prop({ mutable: true }) resourceId?: string = '';
  @State() loading?: boolean = false;
  @State() credentials?: Marketplace.Credential[];

  @Watch('resourceLabel') labelChange(newLabel: string) {
    if (!this.resourceId) {
      this.fetchResourceId(newLabel);
    }
  }

  componentWillLoad() {
    if (this.resourceLabel && !this.resourceId) {
      this.fetchResourceId(this.resourceLabel);
    }
  }

  fetchCredentials = async () => {
    if (!this.connection || !this.resourceId) {
      return;
    }

    this.loading = true;
    const { marketplace } = this.connection;
    const response = await fetch(
      `${marketplace}/credentials/?resource_id=${this.resourceId}`,
      withAuth(this.authToken)
    );
    this.credentials = await response.json();
    this.loading = false;
  };

  async fetchResourceId(resourceLabel: string) {
    if (!this.connection) {
      return;
    }

    const resourceResp = await fetch(
      `${this.connection.marketplace}/resources/?me&label=${resourceLabel}`,
      withAuth(this.authToken)
    );
    const resources: Marketplace.Resource[] = await resourceResp.json();

    if (!Array.isArray(resources) || !resources.length) {
      console.error(`${resourceLabel} product not found`);
      return;
    }

    this.resourceId = resources[0].id;
  }

  credentialsRequested = () => {
    this.fetchCredentials();
  };

  @logger()
  render() {
    return (
      <manifold-resource-credentials-view
        loading={this.loading}
        resourceLabel={this.resourceLabel}
        credentials={this.credentials}
        onCredentialsRequested={this.credentialsRequested}
      />
    );
  }
}

ConnectionTunnel.injectProps(ManifoldCredentials, ['connection', 'authToken']);
