import { Component, Prop } from '@stencil/core';
import { Collection } from 'types/Collection';

import Tunnel from '../../data/marketplace';

@Component({ tag: 'mani-tunnel' })
export class ManiTunnel {
  @Prop() serviceLink?: string;
  @Prop() featured?: string;
  @Prop() collections: Collection[] = [];
  @Prop() services: Catalog.Product[];

  render() {
    return (
      <Tunnel.Provider
        state={{
          services: this.services,
          serviceLink: this.serviceLink,
          featured: this.featured,
          collections: this.collections,
        }}
      >
        <slot name="marketplace-content" />
      </Tunnel.Provider>
    );
  }
}
