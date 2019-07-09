import { h, Component, State } from '@stencil/core';
import { Gateway } from '../../types/gateway';
import ResourceTunnel from '../../data/resource';
import { GatewayResource } from '../../spec/mock/gateway';

@Component({ tag: 'manifold-mock-resource' })
export class ManifoldMockResource {
  @State() resource?: Gateway.Resource;
  @State() loading: boolean = true;

  componentWillLoad() {
    window.setTimeout(() => {
      this.loading = false;
      this.resource = GatewayResource;
    }, 2000);
  }

  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.resource, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
