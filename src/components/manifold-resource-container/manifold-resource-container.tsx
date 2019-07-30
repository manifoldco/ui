import { h, Component, Prop, State, Watch } from '@stencil/core';

import { Gateway } from '../../types/gateway';
import ConnectionTunnel from '../../data/connection';
import ResourceTunnel from '../../data/resource';
import { Connection } from '../../utils/connections';

@Component({ tag: 'manifold-resource-container' })
export class ManifoldResourceContainer {
  /** _(hidden)_ Passed by `<manifold-connection>` */
  @Prop() restFetch?: <T>(
    service: keyof Connection,
    endpoint: string,
    body?: object,
    options?: object
  ) => Promise<T | Error>;
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
    if (!this.restFetch) {
      return;
    }

    this.loading = true;
    const response = await this.restFetch<Gateway.Resource>(
      'gateway',
      `/resources/me/${resourceLabel}`
    );

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.resource = response;
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

ConnectionTunnel.injectProps(ManifoldResourceContainer, ['restFetch']);
