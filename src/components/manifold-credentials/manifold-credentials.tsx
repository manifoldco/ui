import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Marketplace } from '../../types/marketplace';
import ConnectionTunnel from '../../data/connection';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-credentials' })
export class ManifoldCredentials {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
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
    if (!this.restFetch || !this.resourceId) {
      return;
    }

    this.loading = true;
    const response = await this.restFetch<Marketplace.Credential[]>({
      service: 'marketplace',
      endpoint: `/credentials/?resource_id=${this.resourceId}`,
    });

    this.credentials = response;
    this.loading = false;
  };

  async fetchResourceId(resourceLabel: string) {
    if (!this.restFetch) {
      return;
    }

    const resources = await this.restFetch<Marketplace.Resource[]>({
      service: 'marketplace',
      endpoint: `/resources/?me&label=${resourceLabel}`,
    });

    if (!resources || !resources.length) {
      console.error(`${resourceLabel} resource not found`);
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

ConnectionTunnel.injectProps(ManifoldCredentials, ['restFetch']);
