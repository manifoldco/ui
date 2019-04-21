import { Component, Prop } from '@stencil/core';

import Tunnel from '../../data/marketplace';

@Component({ tag: 'manifold-services-tunnel' })
export class ManiTunnel {
  @Prop() hideCustom?: boolean = false;
  @Prop() linkFormat?: string;
  @Prop() featured?: string;
  @Prop() services: Catalog.Product[] = [];

  render() {
    return (
      <Tunnel.Provider
        state={{
          services: this.services,
          featured: this.featured,
          hideCustom: this.hideCustom,
          linkFormat: this.linkFormat,
        }}
      >
        <slot name="marketplace-content" />
      </Tunnel.Provider>
    );
  }
}
