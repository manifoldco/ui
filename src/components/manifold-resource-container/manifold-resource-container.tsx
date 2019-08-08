import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Gateway } from '../../types/gateway';
import ConnectionTunnel from '../../data/connection';
import ResourceTunnel from '../../data/resource';
import { RestFetch } from '../../utils/restFetch';
import logger from '../../utils/logger';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: RestFetch;
  /** Which resource does this belong to? */
  @Prop() resourceLabel?: string;
  /** Set whether or not to refetch the resource from the api until it is in an available and valid state */
  @Prop() refetchUntilValid: boolean = false;
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = false;
  @State() timeout?: number;

  @Watch('resourceLabel') resourceChange(newName: string) {
    clearTimeout(this.timeout);
    this.fetchResource(newName);
  }

  @Watch('refetchUntilValid') refreshChange(newRefresh: boolean) {
    if (newRefresh && (!this.resource || this.resource.state !== 'available')) {
      this.fetchResource(this.resourceLabel);
    }
  }

  componentWillLoad() {
    return this.fetchResource(this.resourceLabel);
  }

  componentDidUnload() {
    clearTimeout(this.timeout);
  }

  fetchResource = async (resourceLabel?: string) => {
    if (!this.restFetch || !this.resourceLabel) {
      return;
    }

    this.loading = true;
    try {
      const response = await this.restFetch<Gateway.Resource>({
        service: 'gateway',
        endpoint: `/resources/me/${resourceLabel}`,
      });

      if (this.refetchUntilValid && (!response || response.state !== 'available')) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }

      this.resource = response;
      this.loading = false;
    } catch (error) {
      // In case we actually want to keep fetching on an error
      if (this.refetchUntilValid) {
        this.timeout = window.setTimeout(() => this.fetchResource(this.resourceLabel), 3000);
      }

      console.error(error);
    }
  };

  @logger()
  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}

ConnectionTunnel.injectProps(ManifoldResourceContainer, ['restFetch']);
