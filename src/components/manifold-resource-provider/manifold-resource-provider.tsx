import { h, Component, Prop } from '@stencil/core';

import ResourceTunnel from '../../data/resource';

@Component({ tag: 'manifold-resource-provider' })
export class ManifoldResourceProvider {
  @Prop() data?: Gateway.Resource;
  @Prop() loading: boolean = false;

  render() {
    return (
      <ResourceTunnel.Provider state={{ data: this.data, loading: this.loading }}>
        <slot />
      </ResourceTunnel.Provider>
    );
  }
}
