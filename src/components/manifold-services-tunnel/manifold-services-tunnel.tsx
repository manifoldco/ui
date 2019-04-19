import { Component, Prop } from '@stencil/core';

import Tunnel from '../../data/marketplace';

@Component({ tag: 'manifold-services-tunnel' })
export class ManiTunnel {
  @Prop() linkFormat?: string;
  @Prop() featured: string[] = [];
  @Prop() services: Catalog.Product[] = [];

  render() {
    return (
      <Tunnel.Provider
        state={{
          services: this.services,
          linkFormat: this.linkFormat,
          featured: this.featured,
        }}
      >
        <slot name="marketplace-content" />
      </Tunnel.Provider>
    );
  }
}
