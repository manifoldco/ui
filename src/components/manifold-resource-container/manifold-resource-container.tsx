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
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = false;

  @Watch('resourceLabel') resourceChange(newName: string) {
    this.fetchResource(newName);
  }

  componentDidLoad() {
    if (this.resourceLabel) {
      return this.fetchResource(this.resourceLabel);
    }
    return null;
  }

  fetchResource = async (resourceLabel: string) => {
    if (!this.restFetch) {
      return;
    }

    this.loading = true;
    const response = await this.restFetch<Gateway.Resource>({
      service: 'gateway',
      endpoint: `/resources/me/${resourceLabel}`,
    });

    if (response instanceof Error) {
      console.error(response);
      return;
    }

    this.resource = response;
    this.loading = false;
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
